import React from 'react';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon } from 'antd-mobile';

import styles from './index.less';

function Header({ dispatch, location }) {
  return (
    <div className={styles.normal}>
      <NavBar
        leftContent="返回"
        mode="light"
        onLeftClick={() => dispatch(routerRedux.push('/'))}
        rightContent={[
          <Icon key="0" type="search" style={{marginRight: '0.32rem'}} />,
          <Icon key="1" type="ellipsis" />
        ]}
      >
        首页
      </NavBar>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default Header;
