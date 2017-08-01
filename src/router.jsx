import React from 'react';
import { Router, Route } from 'dva/router';
import PropTypes from 'prop-types'
import {  routerRedux } from 'dva/router'

import { request } from './utils'
const config = require('./config');
const { api } = config
import fetch from 'dva/fetch';

const LayoutShop = require('./routes/LayoutShop/');

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {

  function checkLogin(nextState, replace, cb) {
    //转义反斜杆是因为微信说state里面只支持字母与数字
    const dest = nextState.location.pathname.replace(/\//g,'777')
    const login = config.wechatLoginUrl.replace('DESTINATION',dest)

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    function parseJSON(response) {
      return response.json();
    }

    function handleResponse(response){
      if(response.ok){
        const user = response.payload
        app._store.dispatch({ type: 'user/updateUser', payload: user })

        if(user.delivery)
          app._store.dispatch({ type: 'user/updateDelivery', payload: user.delivery })

        console.log('check Login passed as server returns user')
        console.log(user)
      }else{
        const fail = response.payload
        console.log(`check login NOT pass because of ${fail.errmsg}, redirect url to ${login}`)
        window.location = login
      }
      cb()
    }
    function handleError(err){
      console.log(`check login NOT pass because of ${err}, redirect url to ${login}`)
      window.location = login
      cb()
    }

    //get stored user
    const {user} = app._store.getState();
    if(!user.id){
      //先从服务get，看server session是否还有效      
      fetch(api.getMe, {method: 'get', fetchType: 'CORS', credentials: 'include'})
      .then(checkStatus)
      .then(parseJSON)
      .then(handleResponse)
      .catch(handleError);

    }else{
      cb()
      console.log('check Login passed because of local user exists.')
    }
  }

  const routes = [
    {
      path: '/shop',
      component: LayoutShop,
      getIndexRoute (nextState, cb) {
         require.ensure(
         	[],
         	require => {
              registerModel(app, require('./models/home'))
           		cb(null, { component: require('./routes/LayoutShop/HomePage/') })
         	},
        	'HomePage'
        )
      },
      childRoutes: [
        {
          path: '/shop/i/:type/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/LayoutShop/ItemPage/'))
            }, 'ItemPage')
          },
        },
      ],
    },
    {
      path: '/shop/address',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/address'));
          cb(null, require('./routes/AddressPage/'))
        }, 'AddressPage')
      },
    },
    {
      path: '/shop/user',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/UserPage/'));
        }, 'UserPage')
      },
    },
    {
      path: '/shop/order/create',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/order_create'));
          cb(null, require('./routes/OrderCreatePage/'))
        }, 'OrderCreatePage')
      },
    },
    {
      path: '/shop/order/list',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/order_list'));
          cb(null, require('./routes/UserPage/OrderListPage/'));
        }, 'OrderListPage')
      },
    },
    {
      path: '/shop/order/show/:id',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/order_show'));
          cb(null, require('./routes/OrderShowPage/'));
        }, 'OrderShowPage')
      },
    },
    {
      path: '/shop/order/edit/:id',
      onEnter: checkLogin,
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/order_edit'));
          cb(null, require('./routes/OrderShowPage/OrderEditPage/'));
        }, 'OrderEditPage')
      },
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
