import { routerRedux } from 'dva/router';
import { parse } from 'qs';


export default {

  namespace: 'order_list',

  state: null,

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *getOrderList({payload,}, { call, put }) {
    },
    
  },

  reducers: {
  },

};
