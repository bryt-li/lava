import { routerRedux } from 'dva/router';
import { parse } from 'qs';


export default {

  namespace: 'order_edit',

  state: null,

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *createOrder({payload,}, { call, put }) {
    },
    
  },

  reducers: {
  },

};
