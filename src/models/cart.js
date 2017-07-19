import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { calculateOrderPrice } from '../utils/price';

export default {

  namespace: 'cart',

  state: {
    //结构与menu完全一样，只是保存每个商品的数量
    //   {type: {item: quantity}}
    items: require('../config/cart'),

    //计算折扣后的总价格
    total: 0,

    //计算折扣后的总优惠
    saving: 0,

    //所有的订单项目
    //[{item:{menu_item}, price:12.0, discount: true/false}]
    order: []
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
      const {type, id} = action.payload
      let newState = {items:{...state['items']}}
      newState['items'][type][id]++
      const {total,saving, order} = calculateOrderPrice(newState.items)
      newState.total = total
      newState.saving = saving
      newState.order = order
      return newState
    },

    minus(state, action) {
      const {type, id} = action.payload;
      let newState = {items:{...state['items']}};
      newState['items'][type][id]--;
      if(newState['items'][type][id]<0)
        newState['items'][type][id] = 0;

      const {total,saving,order} = calculateOrderPrice(newState.items)
      newState.total = total
      newState.saving = saving
      newState.order = order
      return newState;
    },
  },

};
