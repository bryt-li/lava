import { routerRedux } from 'dva/router'

const HOME = require('../config/home.js')

export default {

  namespace: 'app',

  state: {
    
    home: {
      salads:HOME.salads,
      juices:HOME.juices,
      rices:HOME.rices,
      yogurts:HOME.yogurts,
      tests:HOME.tests,
    },

    jsapi_config: null,

  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {

  },

  reducers: {
    updateJsApiConfig(state, action) {
      return {...state, jsapi_config:action.payload}
    },
  },

};
