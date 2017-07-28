import { routerRedux } from 'dva/router';
import { parse } from 'qs';


export default {

  namespace: 'order_show',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *createOrder({payload,}, { call, put }) {
    },
    
  },

  reducers: {
    updateOrder(state, action){
      return { ...state, ...action.payload }
    },
  },

};
