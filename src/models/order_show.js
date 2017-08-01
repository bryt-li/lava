import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { getWechatPayJsapiArgs, getOrder, convertOrderForClient } from '../services/order';
import { Toast } from 'antd-mobile'
import pathToRegexp from 'path-to-regexp';

export default {

  namespace: 'order_show',

  state: {
    order: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/order/show/:id').exec(pathname);
        if (match) {
          const id = match[1]
          dispatch({type:'getOrder',payload:id})
        }
      });
      
    },
  },

  effects: {
    *getOrder({payload,}, { call, select, put }) {
      Toast.loading('正在加载订单',0)
      const id = payload

      const { response, err } = yield call(getOrder, id)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        Toast.hide()
        return
      }

      const order = convertOrderForClient(response.payload)

      yield put({type:'updateOrder',payload:order})
      Toast.hide()

      console.log('server return order:')
      console.log(order)
    },

    *wechatPay({payload,}, { call, select, put }) {
      Toast.loading('正在发起支付',0)

      console.log('start wechat pay')
      const {order} = yield(select(state => state.order_show))

      if(!order || !order.id || order.status>0 || order.total_price<=0){
        Toast.hide()
        Toast.fail('订单状态错误')
        return
      }

      const { response, err } = yield call(getWechatPayJsapiArgs, order.id)
      if(err || !response || !response.ok || !response.payload){
        console.log('wechatPay error')
        console.error(err)
        console.error(response)
        Toast.hide()
        Toast.fail('创建微信支付订单失败')
        return
      }

      

      //调用微信支付JSAPI
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": response.payload.appId,
          "timeStamp": response.payload.timeStamp,
          "nonceStr": response.payload.nonceStr,
          "package": response.payload.package,
          "signType": response.payload.signType,
          "paySign": response.payload.paySign
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
            order.status = 1
            put({ type: 'updateOrder', payload: order })
            Toast.hide()
            Toast.info('微信支付成功')
          }
          if(res.err_msg == "get_brand_wcpay_request:fail" ) {
            Toast.hide()
            Toast.fail('微信支付失败')            
          }
          if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
            Toast.hide()
            Toast.info('取消微信支付')
          }
        }
      )

      Toast.hide()
    },
  },

  reducers: {
    updateOrder(state, action){
      return { ...state, order: action.payload }
    },
  },

};
