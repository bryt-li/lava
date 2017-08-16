import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { getAdminOrderList, convertOrderForClient } from '../../services/order';
import { Toast } from 'antd-mobile'


function status2title(status){
  if(status=='created')
    return '未支付订单'
  if(status=='paid')
    return '已支付订单'
  if(status=='confirmed')
    return '已确认订单'
  if(status=='delivery')
    return '待配送订单'
  if(status=='finished')
    return '已完成订单'
  if(status=='cancelled')
    return '已取消订单'
}

export default {

  namespace: 'AdminOrderListPage',

  state: {
    orders: null,
    ui:{
      title: null,
    }
  },

  subscriptions: {

  },

  effects: {
    *componentWillMount({payload,}, { call, put }) {
      const {status} = payload
      const title = status2title(status)

      const { response, err } = yield call(getAdminOrderList, status)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      const orders = response.payload.map((order)=>convertOrderForClient(order))

      yield put({type:'updateOrders',payload:orders})
      yield put({type:'updateUI',payload:{title}})

      console.log('server return orders:')
      console.log(orders)
    },
  },

  reducers: {
    updateUI(state, action){
      return { ...state, ui: {...state.ui, ...action.payload }}
    },

    updateOrders(state, action){
      return { ...state, orders: action.payload }
    },

  },

};
