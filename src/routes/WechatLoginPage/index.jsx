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

		const {dispatch, user, location} = props
    	const dest = location.hash.replace('#','')

		if(user.id){
	        dispatch(routerRedux.replace(dest))
	        console.log(`wechat login page find user already signed in, directly replace to ${dest}`)
	        return
		}

		//因为微信浏览器不支持iframe跳转登录
		//必须离开当前H5应用
		window.location = config.wechatLoginUrl.replace('DESTINATION',dest.replace(/\//g,'777'))
	}

	render(){
		const {dispatch, user, location} = this.props
		if(user.id)
			return null

	  	return (
		<div className={styles.container}>
			<Helmet>
	            <title>正在进行微信登录</title>
	            <script src='/res/login.js' type="text/javascript" />
	        </Helmet>
		</div>
	  	);
	}
}

WechatLoginPage.propTypes = {
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(WechatLoginPage);
