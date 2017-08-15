import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { getWechatJsapiConfig } from '../../services/wechat';
import { getWechatPayJsapiArgs } from '../../services/pay';
import { Toast } from 'antd-mobile'

export default {

  namespace: 'WechatPayPage',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/user/wechatpay/:id').exec(pathname);
        if (match) {
          const id = match[1]
          dispatch({type:'wechatPay',payload:{id}})
        }
      })
    },
  },

  effects: {
    *wechatPay({payload,}, { call, select, put }) {
      console.log('start wechat pay')
      const {id} = payload


      const jsApiList = 'chooseWXPay'
      var { response, err } = yield call(getWechatJsapiConfig, jsApiList)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)
        Toast.fail('获取微信JSAPI配置失败')
        return
      }
      
      const jsapi_config = response.payload
      console.log(jsapi_config)

      var { response, err } = yield call(getWechatPayJsapiArgs, id)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)

        Toast.fail('创建微信支付订单失败')
        return
      }

      const jsapi_pay = response.payload
      console.log(jsapi_pay)

      //坑，请看微信支付文档
      //https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
      jsapi_pay.timestamp = jsapi_pay.timeStamp
      delete jsapi_pay.timeStamp
      delete jsapi_pay.appId
      
      //wechat pay begine
      wx.config({
        debug:true,
        ...jsapi_config
      })

      wx.ready(function(){
        wx.chooseWXPay({
          ...jsapi_pay,
          success: function (res) {
            Toast.info('微信支付成功')
            window.onWechatPayFinished()
          }
        })
      })

    },
  },

  reducers: {
    
  },

};
