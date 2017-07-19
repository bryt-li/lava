
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { queryMe } from '../services/user';

const config =  require('../config');

export default {

  namespace: 'user',

  state: {
  },

  subscriptions: {
    /* backend will redirect other pages to here '/model/user'
     to sign in/out 
    get_backend_user({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname)
        if(pathname.indexOf('/model/user?')==0){
          let ret = parse(pathname.substring(pathname.indexOf('?')+1))
          const {clear} = ret
          if(clear){
            dispatch({ type: 'signedOut'});
            dispatch(routerRedux.replace(ret.redirect))
          }else{
            let user = {...ret}
            delete user.redirect
            dispatch({ type: 'signedIn', payload:user});
            dispatch(routerRedux.replace(ret.redirect))
          }
        }
      });
    },
    */

    setup({ dispatch, history }) {
      dispatch({ type: 'queryMe' });
    },
  },

  effects: {
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
