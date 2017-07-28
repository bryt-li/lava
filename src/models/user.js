
import { routerRedux } from 'dva/router';
import { parse } from 'qs'
import { getMe, logout, getDelivery,saveDelivery } from '../services/user';
import pathToRegexp from 'path-to-regexp'

const config =  require('../config');

const NULL_USER = {
  id: null,
  openid: null,
  nickname: null,
  sex: null,
  country: null,
  province: null,
  city: null,
  headImageUrl: null,
  delivery: {
    id: null,
    name:'',
    phone:'',
    address:'',
    city:'',
    location:'',
    lat:null,
    lng:null
  },
}

export default {
  namespace: 'user',

  state: NULL_USER,

  subscriptions: {
    setup({ dispatch, history }) {
      //get signed in user
      dispatch({ type: 'getMe' });

      //check url for login
//      return history.listen(({ pathname }) => {
//        const match = pathToRegexp(`/user`).exec(pathname);
//        if(match)
//          dispatch({ type: 'checkLogin', payload: {pathname}});
//      });
    },
  },

  effects: {
    *getMe ({payload,}, { call, put }) {
      console.log('start get me')
      const { response, err } = yield call(getMe)
      if(err || !response){
        console.log('get me error')
        console.error(err)
        return
      }

      if(response.ok==null || !response.payload){
        console.log(`get me response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.log(`get me succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      const user = JSON.parse(response.payload)
      yield put({ type: 'updateUser', payload: user })

      console.log('get me succeeded with payload:')
      console.log(user)
    },

    *logout({payload}, { call, put }){
      const { response, err } = yield call(logout)
      if(err || !response){
        console.log(err)
        return
      }
      
      if(response.ok==null || !response.payload){
        console.log(`response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.log(`query succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      yield put({type:'updateUser', payload: NULL_USER})
      yield put(routerRedux.push('/'))
    },

    *gotoClosedPage({payload}, { call, select, put }){
      const dest = payload;
      const id = yield select(state => state.user.id);
      if(id){
        yield put(routerRedux.push(dest))
      }
      else{
//        const state = dest.replace(/\//g,'777')
//        const url = config.wechatLoginUrl.replace('STATE',state)
//        console.log(`no user signed in, redirect to login. url=${url}`)
        yield put(routerRedux.push(`/login#${dest}`))
      }
    },

    *saveDelivery({payload},{call,select,put}){
      //always save to localStorage
      const store = {...payload}

      const user = yield(select(state => state.user))
      if(!user || !user.id){
        console.error('no user signed in.')
        return
      }

      //if user signed in, save to remote
      const { response, err } = yield call(saveDelivery, payload)
      if(err || !response){
        console.error(err)
        return
      }
      
      if(response.ok==null || !response.payload){
        console.error(`save delivery response format error: ${response}`)
        return
      }

      if(!response.ok){
        console.error(`save delivery  succeeded with error message: ${response.payload.errmsg}`)
        return
      }

      console.log(`save delivery  succeeded with payload: ${response.payload}`)

      //update data
      yield put({ type: 'updateDelivery', payload: payload })

      //redirect back
      //get backUrl
      yield put(routerRedux.goBack())
    },
  },

  reducers: {
    updateUser(state, action) {
      return {...state, ...action.payload};
    },

    updateDelivery(state, action){
      return {
        ...state, 
        delivery:{...state.delivery, ...action.payload}
      };
    },

  },

};
