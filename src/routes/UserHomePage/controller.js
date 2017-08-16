
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { logout } from '../../services/user';
import pathToRegexp from 'path-to-regexp'


export default {
  namespace: 'UserHomePage',

  state: {},

  subscriptions: {
  },

  effects: {
    *logout({payload}, { call, put }){
      const { response, err } = yield call(logout)
      if(err || !response || !response.ok || !response.payload){
        console.log('response error')
        console.log(err)
        console.log(response)
        return
      }
      
      yield put({type:'user/updateUser', payload: {}})
      yield put(routerRedux.push('/shop/home'))
    },

  },

  reducers: {

  },

};
