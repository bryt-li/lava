import React from 'react'
import { connect } from 'dva'
import {  routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import {  NavBar, Icon, Input } from 'antd-mobile'
import { Link } from 'dva/router'

import styles from './index.less'

const config = require('../../../config')

function Header({ dispatch, location, delivery, user }) {

  const handleHomeClicked = ()=>{
    if(user.openid && config.admin.includes(user.openid))
      dispatch(routerRedux.push('/user/admin/home'))
    else
      dispatch(routerRedux.push('/shop/home'))
  }

  const handleAddressClicked = ()=>{
    window.sessionStorage.setItem('address_page_return', location.pathname)
    dispatch(routerRedux.push('/user/address'))
  }

  const handleUserClicked = ()=> {
    dispatch(routerRedux.push('/user/home'))
  }
  
  let address = delivery?delivery.location:'设置收货地址'
  if(address.length>9){
    address = address.substr(0,9)+'...'
  }

  return (
    <div className={styles.container}>
      <NavBar
        iconName={null}
        rightContent={
          <div onClick={handleHomeClicked}>
            <Icon type="#icon-icon-test" size='sm' className={styles.home_icon}/>
          </div>
        }
        leftContent={
          <div onClick={handleUserClicked}>
          {
            user.headImageUrl?
            <img className={styles.user_icon} src={user.headImageUrl} />
            :
            <Icon type="#icon-ren" size='md' />
          }
          </div>
        }
        mode="light"
      >
        <div onClick={handleAddressClicked}>
            <Icon type="#icon-map" size='xxs' />
            <span className={styles.address_title}>{address}</span>
        </div>
      </NavBar>
    </div>
  );
}

Header.propTypes = {
}

const mapStateToProps = (state) => ({
    user: state.user,
    delivery: state.user.delivery
})

export default connect(mapStateToProps)(Header);
