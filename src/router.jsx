import React from 'react';
import { Router, Route } from 'dva/router';
import PropTypes from 'prop-types'

const LayoutShop = require('./routes/layoutShop/');


const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    /*
    {
      path: '/',
      component: LayoutShop,
      getIndexRoute (nextState, cb) {
         require.ensure(
         	[],
         	require => {
           		registerModel(app, require('./models/home'))
              registerModel(app, require('./models/cart'))
           		cb(null, { component: require('./routes/layoutShop/HomePage') })
         	},
        	'HomePage'
        )
      },
      childRoutes: [
        {
          path: '/circle',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/item'))
              cb(null, require('./routes/layoutShop/CirclePage/'))
            }, 'CirclePage')
          },
        },
      ],
    },
    */
    {
      path: '/wechat/login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/WechatLoginPage/'));
        }, 'WechatLoginPage')
      },
    },
    {
      path: '/wechat/login/succeed',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          cb(null, require('./routes/WechatLoginSucceedPage/'));
        }, 'WechatLoginSucceedPage')
      },
    },
    {
      path: '/',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/home'));
          registerModel(app, require('./models/user'));
          registerModel(app, require('./models/cart'));
          cb(null, require('./routes/HomePage/'));
        }, 'HomePage')
      },
    },
    {
      path: '/i/:type/:id',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/item'));
          registerModel(app, require('./models/cart'));
          cb(null, require('./routes/ItemPage/'))
        }, 'ItemPage')
      },
    },
    {
      path: '/order/confirm',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/ConfirmOrderPage/'))
        }, 'ConfirmOrderPage')
      },
    },
    {
      path: '/user',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/UserPage/'));
        }, 'UserPage')
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
