
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { queryMe } from '../services/user';

const config =  require('../config');

export default {

  namespace: 'user',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  
      //dispatch({ type: 'queryMe' });
    },
  },

  effects: {
    *signIn({
      payload,
    }, { call, put }) {
      yield put({ type: 'signedIn'})
    },
    *signOut({
      payload,
    }, { call, put }) {
      yield put({ type: 'signedOut'})
    },
    *queryMe ({
      payload,
    }, { call, put }) {
      const { response, err } = yield call(queryMe)
      if(err || !response){
        console.log(err)
        return
      }
      
      let response_payload = JSON.parse(response.payload)
      if(response.ok==null || !response_payload){
        console.log(`response format error: ${response}`)
        return
      }

      if(response.ok){
        yield put({ type: 'queryMeSuccess', payload: response_payload })
        console.log(`query succeeded with payload: ${response_payload}`)
      }
      else{
        console.log(`query succeeded with error message: ${response_payload.errmsg}`)
      }
    },
  },

  reducers: {
    queryMeSuccess(state, action) {
      return action.payload;
    },
    signedIn(state, action) {
      return action.payload;
    },
    signedOut(state, action){
      return {}
    }
  },

};
