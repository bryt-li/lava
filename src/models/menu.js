
import { routerRedux } from 'dva/router'
import {calculateOrderPrice} from '../utils/price'

const MENU = require('../config/menu/');

function emptyMenu(menu){
  const new_menu = {}
  for(var t in menu){
    new_menu[t] = {}
    for(var i in menu[t]){
      new_menu[t][i] = {...menu[t][i]}
      new_menu[t][i].quantity = 0
    }
  }
  return new_menu
}

export default {

  namespace: 'menu',

  state: {
    //全部菜品信息，在配置中增加了一个quantity数量属性
    catalog: emptyMenu(MENU),

    //所有已点单的项目都单独列在这里，把折扣等计算出来
    //[{...menu[type][id], order_price:订单里每个商品的实际价格（计算折扣后）}]
    items: [],

    //计算折扣后的总价格
    total: 0,

    //计算折扣后的总优惠
    saving: 0,

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'restoreModelFromLocalStorage'})
    },
  },

  effects: {

    *restoreModelFromLocalStorage({payload},{call,select,put}){
      //这是当前的新菜单，quantity都是0
      const { menu } = yield(select(_ => _))
      const { catalog } = menu

      //这是原来保存的点菜菜单，注意：有可能新旧菜单中的菜品不一致
      const stored_menu = JSON.parse(window.localStorage.getItem('menu'))
      
      if(stored_menu){
        //恢复原来保存的点菜数量
        for(var t in catalog){
          for(var i in catalog[t]){
            if( stored_menu[t]&&
                stored_menu[t][i]&&
                stored_menu[t][i].quantity>0)
              catalog[t][i].quantity = stored_menu[t][i].quantity
          }
        }
      }

      //重新计算
      const {total, saving, items} = calculateOrderPrice(catalog)

      yield put({ 
        type: 'updateModel', 
        payload: {catalog, total, saving, items}
      })

    },

    *changeMenuItemQuantity({payload},{call,select,put}){
      const {type, id, inc} = payload
      const { menu } = yield(select(_ => _))
      const { catalog } = menu

      let quantity = catalog[type][id].quantity
      quantity = quantity + inc
      if(quantity<0)
        quantity=0
      catalog[type][id].quantity = quantity
      const {total, saving, items} = calculateOrderPrice(catalog)

      //save menu to localStorage
      window.localStorage.setItem('menu', JSON.stringify(catalog))

      yield put({ 
        type: 'updateModel', 
        payload: {catalog, total, saving, items}
      })
    },

    *clearMenu({payload},{call,select,put}){
      window.localStorage.removeItem('menu')
      yield put({ type: 'clearModel' })
    }
  },

  reducers: {
    updateModel(state, action) {
      const {catalog, total, saving, items} = action.payload
      return {
        catalog:{...catalog}, //must make a copy
        total:total,
        saving:saving,
        items:items
      }
    },

    clearModel(state,action){
      return {
        catalog: emptyMenu(MENU),
        total: 0,
        saving: 0,
        items: [],
      }
    },
  },

};
