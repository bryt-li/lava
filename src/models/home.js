
import { routerRedux } from 'dva/router';

const HOME = require('../config/home.js');
const HOME_SALADS = HOME.salads;
const HOME_JUICES = HOME.juices;
const HOME_RICES = HOME.rices;
const HOME_YOGURTS = HOME.yogurts;

export default {

  namespace: 'home',

  state: {
    salads:HOME_SALADS,
    juices:HOME_JUICES,
    rices:HOME_RICES,
    yogurts:HOME_YOGURTS
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
