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

  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    *foo ({payload,}, { call, put }) {
    },
  },

  reducers: {
    updateFoo(state, action) {
    },
  },

};
