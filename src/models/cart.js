import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { calculatePrice } from '../utils/price';

export default {

  namespace: 'cart',

  state: {
    items: require('../config/cart'),
    total: 0,
    saving: 0
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },


  effects: {
    *checkout({
      payload,
    }, { put, call }){
      yield put(routerRedux.push('/order/confirm'));
    }

  },

  reducers: {
    plus(state, action) {
      const {type, id} = action.payload;      
      let newState = {items:{...state['items']}};
      newState['items'][type][id]++;
      const {total,saving} = calculatePrice(newState.items);
      newState.total = total;
      newState.saving = saving;
      return newState;
    },

    minus(state, action) {
      const {type, id} = action.payload;
      let newState = {items:{...state['items']}};
      newState['items'][type][id]--;
      if(newState['items'][type][id]<0)
        newState['items'][type][id] = 0;

      const {total,saving} = calculatePrice(newState.items);
      newState.total = total;
      newState.saving = saving;

      return newState;
    },
  },

};
