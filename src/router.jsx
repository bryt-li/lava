import React from 'react';
import { HashRouter, Router, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types'
import {  routerRedux } from 'dva/router'

const LayoutDefault = require('./routes/LayoutDefault/');

const Routers = function () {
  return (
    <HashRouter>
        <Route path="/" component={LayoutDefault} />
    </HashRouter>
  )
}

Routers.propTypes = {
}

export default Routers
