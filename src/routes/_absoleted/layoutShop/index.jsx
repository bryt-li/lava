import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router';

import styles from './index.less'

const Header = require('../../components/Header/');
const Footer = require('../../components/Footer/');

const LayoutShop = ({ children, location, dispatch, app, loading }) => {

  return (
    <div className={styles.normal}>
      <Header title={app.title} location={location} dispatch={dispatch} />
      <Footer childrens={children} location={location} dispatch={dispatch} />
    </div>
  )
}

LayoutShop.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ app, loading }) => ({ app, loading }))(LayoutShop)
