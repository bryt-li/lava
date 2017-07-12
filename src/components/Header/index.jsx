import React from 'react';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

function Header({ title, dispatch, location }) {
  return (
    <div className={styles.container}>
      <NavBar
        iconName='#icon-account'
        mode="light"
        onLeftClick={() => dispatch(routerRedux.push('/user'))}>
        <Link to="/user/address">
            <Icon type="#icon-map" size='xxs' />
            <span className={styles.address_title}>暂未获取到地址</span>
        </Link>
      </NavBar>
    </div>
  );
}


Header.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object.isRequired
};

export default Header;
