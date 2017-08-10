import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { getWechatPayJsapiArgs } from '../../services/pay';
import { Toast } from 'antd-mobile'

export default {

  namespace: 'WechatPayPage',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/user/order/wechatpay/:id').exec(pathname);
        if (match) {
          const id = match[1]
          dispatch({type:'wechatPay',payload:id})
        }
      })
    },
  },

  effects: {
    *wechatPay({payload,}, { call, select, put }) {
      console.log('start wechat pay')
      const id = payload

      const { response, err } = yield call(getWechatPayJsapiArgs, id)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)
        Toast.fail('创建微信支付订单失败')
        return
      }

      const jsapi = response.payload

      //调用微信支付JSAPI
      function onBridgeReady(){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', 
          jsapi,
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {            
              Toast.info('微信支付成功')
            }
            if(res.err_msg == "get_brand_wcpay_request:fail" ) {
              Toast.fail('微信支付失败')            
            }
            if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
              Toast.info('取消微信支付')
            }
            window.onWechatPayFinished()
          }
        )
      }

      if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      }else{
         onBridgeReady();
      }

    },
  },

  reducers: {
    
  },

};
