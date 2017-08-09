import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { getOrder, convertOrderForClient } from '../../services/order';
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'OrderShowPage',

  state: {
    order: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/user/order/show/:id').exec(pathname);
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
    
  },

  reducers: {
    updateOrder(state, action){
      return { ...state, order: {...action.payload} }
    },
  },

};
