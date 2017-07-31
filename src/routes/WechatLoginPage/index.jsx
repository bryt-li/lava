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
		if(user.id){
	    	const dest = location.hash.replace('#','')
	        dispatch(routerRedux.replace(dest))

	        console.log(`wechat login page find user already signed in, directly replace to ${dest}`)
	        return
		}

		window.onSignedIn = this.onSignedIn
		window.onSignInFailed = this.onSignInFailed
	}

	onSignedIn = (json) => {
		const user = JSON.parse(json)

    	const {dispatch} = this.props
        dispatch({ type: 'user/updateUser', payload: user})

    	const dest = this.props.location.hash.replace('#','')
        dispatch(routerRedux.replace(dest))

		console.log(`wechat signed in with user id: ${user.id}, replace url to: ${dest}`)
	}

	onSignInFailed  = () => {
		dispatch(routerRedux.replace('/'))
		console.log('wechat sign in failed, replace url to: /')
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
	user: state.user,
});

export default connect(mapStateToProps)(WechatLoginPage);
