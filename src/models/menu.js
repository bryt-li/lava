
import { routerRedux } from 'dva/router'
import {calculateOrderPrice} from '../utils/price'
import pathToRegexp from 'path-to-regexp';

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

    setup({ dispatch, history }) {
      //restore from localstorage only once
      dispatch({type:'restoreMenuFromLocalStorage'})

      return history.listen(({pathname,query}) => {
        //load from qs when url changes
        const match = pathToRegexp('/shop/home').exec(pathname);
        if (match) {
          dispatch({type:'loadMenuFromQueryString',payload:query})
        }
      })
    },

  },

  effects: {
    *restoreMenuFromLocalStorage({payload},{call,select,put}){
      //这是当前的新菜单，quantity都是0
      const { menu } = yield(select(_ => _))
      const { catalog } = menu
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

    *loadMenuFromQueryString({payload},{call,select,put}){
      //这是当前的新菜单，quantity都是0
      const { menu } = yield(select(_ => _))
      const { catalog } = menu

      const url_menu = payload

      if(Object.keys(url_menu).length === 0)
        return

      //恢复原来保存的点菜数量
      for(var t in catalog){
        for(var i in catalog[t]){
          if( url_menu[i] )
            catalog[t][i].quantity = parseInt(url_menu[i])
        }
      }
    
      //save menu to localStorage
      window.localStorage.setItem('menu', JSON.stringify(catalog))


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
