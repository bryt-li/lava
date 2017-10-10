import React from 'react';
import { connect } from 'dva';
import {  routerRedux, Switch, Route } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";


const UserHomePage = require('../UserHomePage/');
const AddressPage = require('../AddressPage/');
const CartPage = require('../CartPage/');
const OrderListPage = require('../OrderListPage/');
const OrderShowPage = require('../OrderShowPage/');
const OrderEditPage = require('../OrderEditPage/');
const WechatPayPage = require('../WechatPayPage/');

import styles from './index.less';

function LayoutUser({ title, backUrl, dispatch, location, props }) {
	return (
	<div className={styles.container}>
		<Helmet>
	        <title>{title}</title>
	    </Helmet>
		<NavBar
	        leftContent={'返回'}
	        mode="light"
	        onLeftClick={() => backUrl?dispatch(routerRedux.push(backUrl)):dispatch(routerRedux.goBack())}
	    >
	    	{title}
	    </NavBar>
	    <div>
	    	<Switch>
				<Route path='/user/home' component={UserHomePage} />
			    <Route path='/user/address' component={AddressPage} />
			    <Route path='/user/cart' component={CartPage} />
			    <Route path='/user/order/list' component={OrderListPage} />
			    <Route path='/user/order/show/:id' component={OrderShowPage} />
			    <Route path='/user/order/edit/:id' component={OrderEditPage} />
			    <Route path='/user/wechatpay/:id' component={WechatPayPage} />
			</Switch>
	      	<div style={{display:'block',height:'300px'}} />
        </div>
    </div>
	);
}

LayoutUser.propTypes = {
}

const mapStateToProps = (state) => ({
	title: state.LayoutUser.title,
	backUrl: state.LayoutUser.backUrl,
})

export default connect(mapStateToProps)(LayoutUser);
