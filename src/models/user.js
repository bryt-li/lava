
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
    *logout({payload}, { call, put }){
      const { response, err } = yield call(logout)
      if(err || !response){
        console.log(err)
        return
      }
      
      if(response.ok==null || !response.payload){
        console.log(`response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.log(`query succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      yield put({type:'updateUser', payload: {}})
      yield put(routerRedux.push('/'))
    },

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
