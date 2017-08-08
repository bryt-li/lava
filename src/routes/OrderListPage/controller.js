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
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/user/order/list').exec(pathname);
        if (match) {
          dispatch({type:'getOrderList'})
        }
      });  
    },
  },

  effects: {
    *getOrderList({payload,}, { call, put }) {
      Toast.loading('正在加载订单列表',0)

      const { response, err } = yield call(getOrderList)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        Toast.hide()
        return
      }

      const orders = response.payload.map((order)=>convertOrderForClient(order))

      yield put({type:'updateOrders',payload:orders})
      Toast.hide()

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
