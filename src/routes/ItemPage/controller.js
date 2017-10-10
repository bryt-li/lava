import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import {findObj} from '../../utils'
import {wechat_share} from '../../utils/wechat'

const config = require('../../config')

export default {

  namespace: 'ItemPage',

  state: {
    item: null,
    ingredients: null,
    ui: {
      imageLoading: true,
    },
  },

  subscriptions: {
    

  },

  effects: {
    *componentWillMount({payload,}, { call, select, put }) {
      const {type,id} = payload
      const { menu, user, app } = yield(select(_ => _))
      const { catalog } = menu
      yield put({type:'updateIngredients',payload: catalog.ingredients})

      let item = null
      let seasoning = null
      let seasoning_id = null

      if(catalog[type] && catalog[type][id]){
        item = catalog[type][id]
        item.type = type
        item.id = id
        if(item.season){
          let result = findObj(catalog['seasonings'],item.season)
          if(result){
            item.season = {...result.obj,id:result.key}
          }
        }
        yield put({type:'updateItem',payload: item})
        yield put({type:'LayoutShop/setItem',payload:item})

      }
      
      //微信分享
      if(null == app.jsapi_config || null == item)
        return
      const jsapi_config = app.jsapi_config
      const title = user.id?`${user.nickname}分享了【${item.name}】`:`${config.name}【${item.name}】`
      const link = `${config.rootUrl}app/?hlhs#/shop/item/${type}/${id}`
      const imgUrl = `${config.rootUrl}menu/${type}/${id}/home.jpg`
      const desc = item.slogon
      wechat_share(jsapi_config,title,link,imgUrl,desc)
    },

  },

  reducers: {
    updateItem(state, action){
      return { ...state, item: action.payload }
    },

    updateIngredients(state, action){
      return { ...state, ingredients: action.payload }
    },
    
    updateUI(state, action){
      return { ...state, ui:{...state.ui, ...action.payload} }
    },

  },

}
