
import { routerRedux } from 'dva/router';
import { saveDelivery } from '../services/user';

export default {
  namespace: 'address',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {

    *saveDelivery({payload},{call,select,put}){
      //always save to localStorage
      const store = {...payload}

      const user = yield(select(state => state.user))
      if(!user || !user.id){
        console.error('no user signed in.')
        return
      }

      //if user signed in, save to remote
      const { response, err } = yield call(saveDelivery, payload)
      if(err || !response){
        console.error(err)
        return
      }
      
      if(response.ok==null || !response.payload){
        console.error(`save delivery response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.error(`save delivery  succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      console.log(`save delivery  succeeded with payload: ${response.payload}`)

      //update data
      yield put({ type: 'user/updateDelivery', payload: payload })

      //redirect back
      //get backUrl
      yield put(routerRedux.goBack())
    },
  },

  reducers: {
    
  },

};
