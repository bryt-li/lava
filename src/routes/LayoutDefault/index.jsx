import React from 'react';
import { connect } from 'dva';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

function LayoutDefault({ children, dispatch, location,  }) {

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

LayoutDefault.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect()(LayoutDefault);
