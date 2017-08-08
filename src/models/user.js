
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { logout } from '../services/user';
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'user',

  state: {},

  subscriptions: {
  },

  effects: {

  },

  reducers: {
    updateUser(state, action) {
      return {...action.payload};
    },

    updateDelivery(state, action){
      return {
        ...state, 
        delivery:{...state.delivery, ...action.payload}
      };
    },

  },

};
