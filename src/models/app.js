
import { routerRedux } from 'dva/router'
import {calculateOrderPrice} from '../utils/price'

const MENU = require('../config/menu/');

function emptyMenu(menu){
  for(var t in menu){
    for(var i in menu[t]){
      menu[t][i].quantity = 0
    }
  }
  return menu
}

export default {

  namespace: 'app',

  state: {
    //全部菜品信息，且增加了quantity数量属性
    menu: emptyMenu(MENU),

    //计算折扣后的总价格
    total: 0,

    //计算折扣后的总优惠
    saving: 0,

    //所有的订单项目
    //[{...menu[type][id], order_price:订单里每个商品的实际价格（计算折扣后）}]
    order_items: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'restoreModelFromLocalStorage'})
    },
  },

  effects: {

    *restoreModelFromLocalStorage({payload},{call,select,put}){
      //这是当前的新菜单，quantity都是0
      const { app } = yield(select(_ => _))
      const { menu } = app

      //这是原来保存的点菜菜单，注意：有可能新旧菜单中的菜品不一致
      const stored_menu = JSON.parse(window.localStorage.getItem('menu'))
      
      if(stored_menu){
        //在新菜单中恢复原来的点菜数量
        for(var t in stored_menu){
          for(var i in stored_menu[t]){
            const quantity = stored_menu[t][i].quantity
            if(menu[t]&&menu[t][i])
              menu[t][i].quantity = quantity
          }
        }
      }

      //重新计算
      const {total, saving, order_items} = calculateOrderPrice(menu)

      yield put({ 
        type: 'updateModel', 
        payload: {menu, total, saving, order_items}
      })

    },

    *changeMenuItemQuantity({payload},{call,select,put}){
      const {type, id, inc} = payload
      const { app } = yield(select(_ => _))
      const {menu} = app

      let quantity = menu[type][id].quantity
      quantity = quantity + inc
      if(quantity<0)
        quantity=0
      menu[type][id].quantity = quantity
      const {total, saving, order_items} = calculateOrderPrice(menu)

      //save menu to localStorage
      window.localStorage.setItem('menu', JSON.stringify(menu))

      yield put({ 
        type: 'updateModel', 
        payload: {menu, total, saving, order_items}
      })
    },

    *clearMenu({payload},{call,select,put}){
      window.localStorage.removeItem('menu')
      yield put({ type: 'clearModel' })
    }
  },

  reducers: {
    updateModel(state, action) {
      const {menu, total, saving, order_items} = action.payload
      return {
        menu:{...menu}, //must make a copy
        total:total,
        saving:saving,
        order_items:order_items
      }
    },

    clearModel(state,action){
      return {
        menu: emptyMenu(MENU),
        total: 0,
        saving: 0,
        order_items: [],
      }
    },
  },

};
