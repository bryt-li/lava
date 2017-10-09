
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp';
import qs from 'qs'
import {wechat_share} from '../../utils/wechat'

const config = require('../../config');

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

  namespace: 'HomePage',

  state: {
    ui:{
      title: null,
      imageLoading: true
    }
  },

  subscriptions: {
  },

  effects: {

    *componentWillMount({payload,}, { call, select, put }) {

      let title = config.name
      if(payload && payload.name)
        title = payload.name

      yield put({type:'updateUI',payload:{title}})

      //这是当前的新菜单，quantity都是0
      const { menu, user, app } = yield(select(_ => _))
      const { catalog } = menu

      if(payload && Object.keys(payload).length > 0){
        //从url中恢复
        for(var t in catalog){
          for(var i in catalog[t]){
            if( payload[i] )
              catalog[t][i].quantity = parseInt(payload[i])
            else
              catalog[t][i].quantity = 0
          }
        }
      
        //save menu to localStorage
        window.localStorage.setItem('menu', JSON.stringify(catalog))

        yield put({ type: 'menu/updateCatalog', payload: catalog})
      }

      //微信分享
      if(null == app.jsapi_config)
        return

      title = (payload && payload.name)?payload.name:config.name
      title = user.id?`${user.nickname}分享了【${title}】`:title
      const jsapi_config = app.jsapi_config
      const qs = menuToQs(catalog)
      const link = qs?`${config.rootUrl}app/?hlhs#/shop/home?${qs}`:`${config.rootUrl}app/?hlhs#/shop/home`
      const imgUrl = `${config.rootUrl}app/res/suite.jpg`
      const desc = '购买套餐，更有十足优惠'
      wechat_share(jsapi_config,title,link,imgUrl,desc)
    },

  },

  reducers: {
    updateUI(state,action){
      return {
        ...state,
        ui: {...state.ui, ...action.payload}
      }
    }

  },


};
