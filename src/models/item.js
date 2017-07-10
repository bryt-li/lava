import { routerRedux } from 'dva/router';
import { parse } from 'qs';

export default {

  namespace: 'item',

  state: {
    ...g_MENU
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
  },

  reducers: {
  },

};
