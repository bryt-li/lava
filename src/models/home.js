
import { routerRedux } from 'dva/router';
import { getMe } from '../services/user';

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
    setup({ dispatch, history }) {
      //首页进入的时候，执行一次自动登录的尝试
      //看server session是不是仍然有效
      dispatch({ type: 'getMe' });
    },
  },

  effects: {
    *getMe ({payload,}, { call, put }) {
      const { response, err } = yield call(getMe)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      const user = response.payload
      yield put({ type: 'user/updateUser', payload: user })
  
      if(user.delivery)
        yield put({ type: 'user/updateDelivery', payload: user.delivery })

      console.log('home get me succeeded with user')
      console.log(user)
    },
  },

  reducers: {
    
  },

};
