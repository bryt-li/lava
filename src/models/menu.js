
import { routerRedux } from 'dva/router'
import {calculateOrderPrice} from '../utils/price'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
import {wechat_share} from '../utils/wechat'

const MENU = require('../config/menu/')

const config = require('../config')

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

function menuToQs(menu){
  const qs_menu = {}
  for(var t in menu){
    for(var i in menu[t]){
      var quantity = menu[t][i].quantity
      if(quantity>0)
        qs_menu[i] = quantity
    }
  }
  return qs.stringify(qs_menu)
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

  },

  effects: {
    *changeMenuItemQuantity({payload},{call,select,put}){
      const {type, id, inc} = payload
      const { menu,user,app } = yield(select(_ => _))
      const { catalog } = menu

      let quantity = catalog[type][id].quantity
      quantity = quantity + inc
      if(quantity<0)
        quantity=0
      catalog[type][id].quantity = quantity

      //save menu to localStorage
      window.localStorage.setItem('menu', JSON.stringify(catalog))

      yield put({ 
        type: 'updateCatalog', 
        payload: catalog
      })

      //微信分享
      if(null == app.jsapi_config)
        return
      
      const jsapi_config = app.jsapi_config
      let title = config.name
      title = user.id?`${user.nickname}分享了【${title}】`:title
      const qs = menuToQs(catalog)
      const link = qs?`${config.rootUrl}app/?hlhs#/shop/home?${qs}`:`${config.rootUrl}app/?hlhs#/shop/home`
      const imgUrl = `${config.rootUrl}app/res/suite.jpg`
      const desc = '购买套餐，更有十足优惠'
      wechat_share(jsapi_config,title,link,imgUrl,desc)
    },

    *clearMenu({payload},{call,select,put}){
      const { user,app } = yield(select(_ => _))

      window.localStorage.removeItem('menu')
      yield put({ type: 'clearCatalog' })

      //微信分享
      if(null == app.jsapi_config)
        return
      
      const jsapi_config = app.jsapi_config
      let title = config.name
      title = user.id?`${user.nickname}分享了【${title}】`:title
      const link = `${config.rootUrl}app/?hlhs#/shop/home`
      const imgUrl = `${config.rootUrl}app/res/suite.jpg`
      const desc = '购买套餐，更有十足优惠'
      wechat_share(jsapi_config,title,link,imgUrl,desc)
    },

  },

  reducers: {
    updateCatalog(state, action) {
      const {total, saving, items} = calculateOrderPrice(action.payload)
      return {
        catalog:{...action.payload},
        total:total,
        saving:saving,
        items:items
      }
    },

    clearCatalog(state,action){
      return {
        catalog: emptyMenu(MENU),
        total: 0,
        saving: 0,
        items: [],
      }
    },
  },

}

