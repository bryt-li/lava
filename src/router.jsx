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
    {
      path: '/',
      component: LayoutShop,
      getIndexRoute (nextState, cb) {
         require.ensure(
         	[],
         	require => {
           		registerModel(app, require('./models/home'))
           		cb(null, { component: require('./routes/layoutShop/HomePage') })
         	},
        	'HomePage'
        )
      },
      childRoutes: [
        {
          path: '/item/:type/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/item'))
              cb(null, require('./routes/layoutShop/ItemPage/'))
            }, 'ItemPage')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
