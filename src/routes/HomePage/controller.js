
import { routerRedux } from 'dva/router'
import { getMe } from '../../services/user'
import pathToRegexp from 'path-to-regexp';

const HOME = require('../../config/home')
const config = require('../../config');

export default {

  namespace: 'HomePage',

  state: {
    ui:{
      title: null,
      imageLoading: true
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      //首页进入的时候，执行一次自动登录的尝试
      //看server session是不是仍然有效
      dispatch({ type: 'getMe' })

      return history.listen(({pathname,query}) => {
        const match = pathToRegexp('/shop/home').exec(pathname);
        if (match) {
          let title = config.name
          if(query.name)
            title = query.name

          dispatch({type:'updateUI',payload:{title}})
/*
          wx.onMenuShareAppMessage({
            title: '这是标题', // 分享标题
            desc: '这是描述', // 分享描述
            link: 'http://m.huolihuoshan.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://192.168.1.232:8080/res/logo.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
          })
*/

        }
      });  
    },
  },

  effects: {
    *getMe ({payload,}, { call, put }) {
      const { response, err } = yield call(getMe)
      if(err || !response || !response.ok || !response.payload){
        console.error(err)
        console.error(response)
        return
      }

      const user = response.payload
      yield put({ type: 'user/updateUser', payload: user })
  
      if(user.delivery)
        yield put({ type: 'user/updateDelivery', payload: user.delivery })

      console.log('home get me succeeded with user')
      console.log(user)
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
