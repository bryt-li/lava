
import { routerRedux } from 'dva/router'
import { getMe } from '../../services/user'

export default {

  namespace: 'LayoutUser',

  state: {
    title: null,
    backUrl: null,
  },

  subscriptions: {
  },

  effects: {
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
