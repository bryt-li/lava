import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { getOrder, convertOrderForClient } from '../../services/order';
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'OrderShowPage',

  state: {
    order: null,
  },

  subscriptions: {
    
  },

  effects: {
    *componentWillMount({payload,}, { call, select, put }) {
      const id = payload

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
    
  },

  reducers: {
    updateOrder(state, action){
      return { ...state, order: {...action.payload} }
    },
  },

};
