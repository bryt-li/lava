import React from 'react';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

function Header({ user_icon, dispatch, location }) {

  const handleUserClicked = ()=>{
    dispatch(routerRedux.push(`/user#${location.pathname}`))
  }
  
  return (
    <div className={styles.container}>
      <NavBar
        iconName='null'
        leftContent={
          user_icon? <img className={styles.user_icon} src={user_icon} /> : <Icon type="#icon-account" size='md' />
        }
        mode="light"
        onLeftClick={handleUserClicked}>
        <Link to="/user/address">
            <Icon type="#icon-map" size='xxs' />
            <span className={styles.address_title}>暂未获取到地址</span>
        </Link>
      </NavBar>
    </div>
  );
}


Header.propTypes = {
  user_icon: PropTypes.string,
  dispatch: PropTypes.func,
  location: PropTypes.object.isRequired
};

export default Header;
