import React from 'react';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

function Header({ user_icon, dispatch, location }) {

  const handleHomeClicked = ()=>{
    dispatch(routerRedux.push(`/`))
  }
  
  return (
    <div className={styles.container}>
      <NavBar
        iconName={null}
        leftContent={<Icon type="#icon-shouye" size='md' />}
        rightContent={
          <Link to={`/user#${location.pathname}`}>
          {
            user_icon?
            <img className={styles.user_icon} src={user_icon} />
            :
            <Icon type="#icon-vip1" size='md' />
          }
          </Link>
        }
        mode="light"
        onLeftClick={handleHomeClicked}
      >
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
