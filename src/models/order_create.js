import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { createOrder } from '../services/order';


export default {

  namespace: 'order_create',

  state: null,

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *createOrder({payload,}, { select, call, put }) {

      //must signed in
      const user = yield(select(state => state.user))
      if(!user || !user.id){
        yield put(routerRedux.push('/'))
        return
      }

      //if user signed in, save to remote
      payload.id_user = user.id
      const { response, err } = yield call(createOrder, payload)
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
      payload.id = response.payload.id
      console.log(`create order succeeded with id: ${payload.id}`)

      //update data
      yield put({ type: 'order_show/updateOrder', payload: payload })

      const orderUrl = `/order/show`
      yield put(routerRedux.push(orderUrl))
    }, 
  },

  reducers: {
  },

};
