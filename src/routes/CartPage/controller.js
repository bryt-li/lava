import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { createOrder, convertOrderForServer } from '../../services/order'
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';
import {calculateAdvancePrice, calculateDeliveryDistance, calculateDeliveryPrice} from '../../utils/price'
import {getOrderDate,getOrderTime,getOrderPayment} from '../../utils/order'

export default {

  namespace: 'CartPage',

  state: {
    ui:{
      minDate:null,
      maxDate:null,
      availablePayments:null,
      availableTimes:null,
      deliveryDistance:null,
    },
    order:{
      order_items:null,
      date:null,
      time:null,
      items_price:null,
      advance_price:null,
      delivery_price:null,
      total_price:null,
      delivery:{
        name:null,
        phone:null,
        address:null,
        lat:null,
        lng:null,
      },
      payment:null,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/user/cart').exec(pathname);
        if (match) {
          dispatch({type:'prepareOrder'})
        }
      });        
    },
  },

  effects: {
    *prepareOrder({payload}, { select, call, put }) {
      const {menu,user} = yield select(state => state)
      const {items} = menu
      const {delivery} = user

      //不用重复检查模型的可用性
      //因为进到这里来，user和menu.items一定都有效
      //这是由router的onEnter和home的购物车逻辑保证的
      //如果有其它订单创建入口：如直接外链/shop/order/create，则要检查 menu.items
      //所以这里就还是检查一下吧
      if(items.length<=0){
        Toast.info('购物车空空如也')
        yield put(routerRedux.replace('/shop/home'))
        return
      }

      let order = {}
      let ui = {}

      order.items_price = 0
      order.items = items
      for(var i=0;i<items.length;i++)
        order.items_price += items[i].order_price

      const {minDate, date, maxDate} = getOrderDate()
      
      order.date = date
      order.advance_price = calculateAdvancePrice(date)
      ui.minDate = minDate
      ui.maxDate = maxDate

      const {availableTimes, time} = getOrderTime()
      order.time = time
      ui.availableTimes = availableTimes

      if(delivery && delivery.lat && delivery.lng){
        order.delivery = delivery
        order.delivery_price = calculateDeliveryPrice(order.items_price, delivery.lat,delivery.lng)
        ui.deliveryDistance = calculateDeliveryDistance(delivery.lat,delivery.lng)
      }

      const {availablePayments, payment} = getOrderPayment()
      order.availablePayments = availablePayments
      order.payment = payment
      ui.availablePayments = availablePayments

      if(order.delivery_price!=null){
        order.total_price = order.items_price + order.advance_price + order.delivery_price
        if(order.total_price<0)
          order.total_price = 0
      }

      yield put({type:'updateModel',payload:{ui,order}})
    },

    *createOrder({payload}, { select, call, put }) {
      const {user,CartPage} = yield select(state => state)
      const {order} = CartPage

      if(order.delivery_price==null || order.delivery_price>8000){
        Toast.info('请输入有效的配送地址')
        return
      }

      //must signed in
      if(!user || !user.id){
        Toast.hide()
        Toast.info('用户必须先登录')
        yield put(routerRedux.push('/shop/home'))
        return
      }

      Toast.loading('正在下单', 0)

      const server_order = convertOrderForServer(order)

      const { response, err } = yield call(createOrder, server_order)
      if(err || !response || !response.ok || !response.payload){
        Toast.hide()
        Toast.fail('服务器处理订单错误，正在抢修中')
        console.log(err)
        console.log(response)
        return
      }
      
      Toast.hide()
      const {id,code} = response.payload

      //clear menu data
      yield put({ type: 'menu/clearMenu'})

      //goto OrderShowPage
      const url = `/user/order/show/${id}`

      yield put(routerRedux.push(url))

      console.log(`create order succeeded with id: ${id}, code: ${code}, clear menu and redirect to ${url}`)
    },
  },

  reducers: {
    updateModel(state, action) {
      return {
        ui:{...state.ui,...action.payload.ui},
        order:{...state.order,...action.payload.order}
      }
    },

    updateDate(state, action){
      const date = action.payload
      const advance_price = calculateAdvancePrice(date)
      let total_price = null
      if(state.order.delivery_price!=null)
        total_price = state.order.items_price+state.order.delivery_price+advance_price

      return {
        ...state,
        order:{
          ...state.order, 
          date,
          advance_price,
          total_price,
        }
      }
    },

    updateTime(state, action){
      const time = action.payload
      return {
        ...state,
        order:{
          ...state.order,
          time
        }
      }
    }

  },

};
