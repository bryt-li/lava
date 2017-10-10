import { routerRedux } from 'dva/router'

export default {

  namespace: 'app',

  state: {
    jsapi_config: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {

  },

  reducers: {
    updateJsApiConfig(state, action) {
      return {...state, jsapi_config:action.payload}
    },
  },

};
