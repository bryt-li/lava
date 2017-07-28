import React from 'react';
import { connect } from 'dva';
import { Modal, Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, InputItem, Toast, TextareaItem } from 'antd-mobile';
import {Helmet} from "react-helmet";
import {  routerRedux } from 'dva/router'
import { createForm } from 'rc-form'

import styles from './index.less'

const config = require("../../config.js")

const Item = List.Item

class WechatLoginPage extends React.Component {
	constructor(props) {
		super(props)

		window.onSignedIn = this.onSignedIn
		window.onSignInFailed = this.onSignInFailed
	}

	onSignedIn = () => {
		console.log('wechat signed in')

    	const {dispatch} = this.props

    	const dest = this.props.location.hash.replace('#','')

        dispatch({ type: 'user/getMe'})
        dispatch(routerRedux.replace(dest))
	}

	onSignInFailed  = () => {
		console.log('wechat sign in failed')
	}

	render(){
	  	return (
		<div className={styles.container}>
			<Helmet>
	            <title>正在进行微信登录</title>
	            <script src='/res/login.js' type="text/javascript" />
	        </Helmet>
		    <iframe width="100%" height="100%" frameBorder="0" 
			    src={config.wechatLoginUrl}>
			</iframe> 
		</div>
	  	);
	}
}

WechatLoginPage.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect()(WechatLoginPage);
