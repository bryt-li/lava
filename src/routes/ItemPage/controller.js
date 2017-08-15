import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import {findObj} from '../../utils'
import { getWechatJsapiConfig } from '../../services/wechat';


const config = require('../../config')

export default {

  namespace: 'ItemPage',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {

      return history.listen(({pathname,query}) => {
        const match = pathToRegexp('/shop/item/:type/:id').exec(pathname);
        if (match) {
          const type = match[1]
          const id = match[2]
          dispatch({type:'init',payload:{type,id}})
        }
      })
    },
  },

  effects: {
    *init({payload,}, { call, select, put }) {
      const {type,id} = payload
      const { menu, user } = yield(select(_ => _))
      const { catalog } = menu

      let item = null
      let seasoning = null
      let seasoning_id = null

      if(catalog[type] && catalog[type][id]){
        item = catalog[type][id]
        if(item.season){
          let result = findObj(catalog['seasonings'],item.season)
          if(result){
            seasoning = result.obj
            seasoning_id = result.key
          }
        }
      }

      //没有登录是分享不了的，以后优化这个逻辑
      //TODO
      if(null == item || null == user.id)
        return

      const share_args = {
        title: `${user.nickname}分享了${item.name}给你`, // 分享标题
        link: `${config.rootUrl}app/?hlhs#/shop/item/${type}/${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${config.rootUrl}menu/${type}/${id}/home.jpg`, // 分享图标
      }

      const url = window.location.href
      const jsApiList = 'onMenuShareTimeline,onMenuShareAppMessage'
      var { response, err } = yield call(getWechatJsapiConfig, url, jsApiList)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)
        Toast.fail('获取微信JSAPI配置失败')
        return
      }
      
      const jsapi_config = response.payload
      console.log(jsapi_config)
      
      //wechat pay begine
      wx.config({
        debug:true,
        ...jsapi_config
      })

      wx.ready(function(){
        wx.onMenuShareTimeline({
            ...share_args,
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        })

        wx.onMenuShareAppMessage({
            ...share_args,
            desc: item.slogon,
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        })
      })

    },

  },

  reducers: {
  },

}
