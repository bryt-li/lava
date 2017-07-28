import React from 'react';
import { Router, Route } from 'dva/router';
import PropTypes from 'prop-types'

const LayoutShop = require('./routes/LayoutShop/');

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: LayoutShop,
      getIndexRoute (nextState, cb) {
         require.ensure(
         	[],
         	require => {
              registerModel(app, require('./models/user'))
              registerModel(app, require('./models/home'))
           		cb(null, { component: require('./routes/LayoutShop/HomePage/') })
         	},
        	'HomePage'
        )
      },
      childRoutes: [
        {
          path: '/i/:type/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/app'))
              cb(null, require('./routes/LayoutShop/ItemPage/'))
            }, 'ItemPage')
          },
        },
      ],
    },
    {
      path: '/address',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          cb(null, require('./routes/AddressPage/'))
        }, 'AddressPage')
      },
    },
    {
      path: '/address/map',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          cb(null, require('./routes/AddressPage/MapPage/'))
        }, 'MapPage')
      },
    },
    {
      path: '/user',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          cb(null, require('./routes/UserPage/'));
        }, 'UserPage')
      },
    },
    {
      path: '/order/create',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/app'));
          registerModel(app, require('./models/user'));
          registerModel(app, require('./models/order_show'));
          registerModel(app, require('./models/order_create'));
          cb(null, require('./routes/OrderCreatePage/'))
        }, 'OrderCreatePage')
      },
    },
    {
      path: '/order/list',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          registerModel(app, require('./models/order_list'));
          cb(null, require('./routes/UserPage/OrderListPage/'));
        }, 'OrderListPage')
      },
    },
    {
      path: '/order/show',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          registerModel(app, require('./models/order_show'));
          cb(null, require('./routes/OrderShowPage/'));
        }, 'OrderShowPage')
      },
    },
    {
      path: '/order/edit',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          registerModel(app, require('./models/order_edit'));
          cb(null, require('./routes/OrderShowPage/OrderEditPage/'));
        }, 'OrderEditPage')
      },
    },
    {
      path: '/login',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/user'));
          cb(null, require('./routes/WechatLoginPage/'));
        }, 'WechatLoginPage')
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
