import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { wechatPay, getOrder, convertOrderForClient } from '../services/order';
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'order_show',

  state: {
    order: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/order/show/:id').exec(pathname);
        if (match) {
          const id = match[1]
          dispatch({type:'getOrder',payload:id})
        }
      });
      
    },
  },

  effects: {
    *getOrder({payload,}, { call, select, put }) {
      Toast.loading('正在加载订单',0)
      const id = payload

      const { response, err } = yield call(getOrder, id)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        Toast.hide()
        return
      }

      const order = convertOrderForClient(response.payload)

      yield put({type:'updateOrder',payload:order})
      Toast.hide()

      console.log('server return order:')
      console.log(order)
    },

    *wechatPay({payload,}, { call, select, put }) {
      const {order_code, total_fee} = payload
      console.log('start wechat pay')
      const { response, err } = yield call(wechatPay)
      if(err || !response){
        console.log('wechatPay error')
        console.error(err)
        return
      }

      if(response.ok==null || !response.payload){
        console.log(`wechat pay response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.log(`wechat pay succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      const payment = JSON.parse(response.payload)
//      yield put({ type: 'updateUser', payload: user })

      console.log('wechat pay succeeded with payload:')
      console.log(payment)

    },
    
  },

  reducers: {
    updateOrder(state, action){
      return { ...state, order: action.payload }
    },
  },

};
