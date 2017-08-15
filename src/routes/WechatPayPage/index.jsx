import React from 'react';
import { connect } from 'dva';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input, Result } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

class WechatPayPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch,params} = this.props
		dispatch({type:'WechatPayPage/componentWillMount',payload:{id:params.id}})
	}

	render(){
		return (
		<div className={styles.container}>
			<Result
			    img={<Icon type='#icon-waiting' size='lg'/>}
			    title="等待处理"
			    message="正在提交付款申请，等待银行处理"
			/>
		</div>
		)
	}
}

WechatPayPage.title = '微信支付'

WechatPayPage.onBackClick = (dispatch, props)=> ()=>{
	dispatch(routerRedux.goBack())
}

WechatPayPage.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect()(WechatPayPage);
