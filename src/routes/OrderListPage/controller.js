import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { getOrderList, convertOrderForClient } from '../../services/order';
import { Toast } from 'antd-mobile'

export default {

  namespace: 'OrderListPage',

  state: {
    orders: null,
  },

  subscriptions: {

  },

  effects: {
    *componentWillMount({payload,}, { call, put }) {
      const { response, err } = yield call(getOrderList)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      const orders = response.payload.map((order)=>convertOrderForClient(order))

      yield put({type:'updateOrders',payload:orders})

      console.log('server return orders:')
      console.log(orders)
    },
  },

  reducers: {
    updateOrders(state, action){
      return { ...state, orders: action.payload }
    },

  },

};
