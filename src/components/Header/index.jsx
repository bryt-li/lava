import React from 'react';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

const config =  require('../../config');

function Header({ user_icon, dispatch, location }) {

  const login = () => {
    //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节，我们用777表示路径中的/
    let url = config.api.wechatLogin.replace('CALLER_URL',location.pathname.replace(/\//g,'777'));
    window.location = url;
  }

  return (
    <div className={styles.container}>
      <NavBar
        iconName='null'
        leftContent={
          user_icon? <img src={user_icon} /> : <Icon type="#icon-account" size='md' />
        }
        mode="light"
        onLeftClick={login}>
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
