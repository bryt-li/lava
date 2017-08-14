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
      const { response, err } = yield call(getWechatJsapiConfig, jsApiList)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)
        Toast.fail('获取微信JSAPI配置失败')
        return
      }
      
      const jsapi_config = response.payload
      console.log(jsapi_config)

      const { response1, err1 } = yield call(getWechatPayJsapiArgs, id)
      if(err1 || !response1 || !response1.ok || !response1.payload){
        console.log('wechatPay error')
        console.error(err1)
        console.error(response1)
        Toast.fail('创建微信支付订单失败')
        return
      }

      const jsapi_pay = response1.payload
      console.log(jsapi_pay)

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
