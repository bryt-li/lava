import { routerRedux } from 'dva/router'
import { getWechatJsapiArgs } from '../services/wechat';

export default {

  namespace: 'app',

  state: {
    jsapi_config: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.startsWith('/shop/') || pathname === '/user/cart') {
          //check wechat login
          dispatch({ type: 'getWechatJsapiArgs', payload: {pathname} })
        }
      });
    },
  },

  effects: {
    *getWechatJsapiArgs ({payload,}, { call, put }) {
      const { pathname } = payload
      const { response, err } = yield call(getWechatJsapiArgs, window.location.href)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }
      
      const config = response.payload
      yield put({ type: 'updateJsApiConfig', payload: config })

      console.log('wechat jsapi init as server returns config')
      console.log(config)
    },

  },

  reducers: {
    updateJsApiConfig(state, action) {
      return {...state, jsapi_config:action.payload}
    },
  },

};
