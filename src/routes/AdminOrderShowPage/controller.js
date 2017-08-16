import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { getOrder, updateOrderStatus, convertOrderForClient } from '../../services/order';
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'AdminOrderShowPage',

  state: {
    order: null,
  },

  subscriptions: {
    
  },

  effects: {
    *componentWillMount({payload,}, { call, select, put }) {
      const {id} = payload

      const { response, err } = yield call(getOrder, id)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      const order = convertOrderForClient(response.payload)

      yield put({type:'updateOrder',payload:order})

      console.log('server return order:')
      console.log(order)
    },
    
    *changeOrderStatus({payload,}, { call, select, put }) {
      const {id, status} = payload

      const { response, err } = yield call(updateOrderStatus, id, status)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      yield put({type:'updateOrderStatus',payload:response.payload.status})
    },

  },

  reducers: {
    updateOrder(state, action){
      return { ...state, order: {...action.payload} }
    },
    updateOrderStatus(state, action){
      return { ...state, order: {...state.order, status: action.payload} }
    },
  },

};
