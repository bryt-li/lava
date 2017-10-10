
import { routerRedux } from 'dva/router'
import { getMe } from '../../services/user'

export default {

  namespace: 'LayoutShop',

  state: {
    item: null,
  },

  reducers: {
    clearItem(state, action){
      return { item: null }
    },

    setItem(state, action){
      return { item: {...action.payload} }
    },

  },

};
