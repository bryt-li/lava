
import { routerRedux } from 'dva/router'
import { getMe } from '../../services/user'

export default {

  namespace: 'LayoutUser',

  state: {
    title: null,
    backUrl: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
/*
      return history.listen(({ pathname, query }) => {
        if (pathname.startsWith('/user/')) {
          //check wechat login
          dispatch({ type: 'checkLogin' })
        }
      });
*/
    },

  },

  effects: {
    *checkLogin({payload}, { call, put }) {

    },

    *setNav({payload}, { call, put }) {
      yield put({type:'updateData',payload})
    },
  },

  reducers: {
    updateData(state, action){
      return { ...state, ...action.payload }
    },

  },

};
