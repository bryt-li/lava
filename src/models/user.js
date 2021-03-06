
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { logout } from '../services/user';
import pathToRegexp from 'path-to-regexp'
import { getMe } from '../services/user'

export default {
  namespace: 'user',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      //进入应用的时候，执行一次自动登录的尝试
      //看server session是不是仍然有效
      dispatch({ type: 'getMe', payload: { pathname: history.location.pathname } })
    },
  },

  effects: {
    *getMe ({payload,}, { call, put }) {
      const {pathname} = payload

      const { response, err } = yield call(getMe)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)

        //Check Login
        if(pathname.startsWith('/user/')){
          //转义反斜杆是因为微信说state里面只支持字母与数字
          const dest = nextState.location.pathname.replace(/\//g,'777')
          const login = config.wechatLoginUrl.replace('DESTINATION',dest)
          window.location = login
          console.log(`redirect to login: ${login}`)
        }
        return
      }

      const user = response.payload
      yield put({ type: 'updateUser', payload: user })
  
      if(user.delivery)
        yield put({ type: 'updateDelivery', payload: user.delivery })

      console.log('home get me succeeded with user')
      console.log(user)
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

}
