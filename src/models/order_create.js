import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { createOrder, convertOrderForServer } from '../services/order'
import { Toast } from 'antd-mobile'

export default {

  namespace: 'order_create',

  state: null,

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *createOrder({payload}, { select, call, put }) {      
      Toast.loading('正在下单', 0)
      //must signed in
      const user = yield(select(state => state.user))
      if(!user || !user.id){
        Toast.hide()
        Toast.info('用户必须先登录')
        yield put(routerRedux.push('/shop/'))
        return
      }

      payload.id_user = user.id
      const order = convertOrderForServer(payload)

      const { response, err } = yield call(createOrder, order)
      if(err || !response || !response.ok || !response.payload){
        Toast.hide()
        Toast.fail('服务器处理订单错误，正在抢修中')
        console.log(err)
        console.log(response)
        return
      }
      
      Toast.hide()

      order.id = response.payload.id
      order.code = response.payload.code

      //clear menu data
      yield put({ type: 'app/clearMenu'})

      //goto OrderShowPage
      const url = `/shop/order/show/${order.id}`
      yield put(routerRedux.push(url))

      console.log(`create order succeeded with id: ${order.id}, code: ${order.code}, clear menu and redirect to ${url}`)
    },
  },

  reducers: {
  },

};
