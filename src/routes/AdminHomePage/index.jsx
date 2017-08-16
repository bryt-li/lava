import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, Toast } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import styles from './index.less';


const Item = List.Item
const Brief = Item.Brief

class AdminHomePage extends React.Component {
	constructor(props) {
		super(props)
	}

	onCreatedOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/created'))
	}

	onPaidOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/paid'))
	}

	onConfirmedOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/confirmed'))
	}

	onDeliveryOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/delivery'))
	}

	onFinishedOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/finished'))
	}

	onCancelledOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/admin/order/list/cancelled'))
	}

	onSoonClick = () => {
		Toast.info('正在努力上线中');
	}

	render(){
	  	const {dispatch, user} = this.props

		return (
		    <div>
		    	<WingBlank className={styles.header}>
		    		<img src={user.headImageUrl} />
		    		<h3>{user.nickname}</h3>
		    	</WingBlank>
				<List>
			        <Item
				        thumb={<Icon type='#icon-icon'/>}
				        arrow="horizontal"
				        onClick={this.onCreatedOrdersClick}>
				        未付款订单
		          	</Item>
			        <Item
				        thumb={<Icon type='#icon-12'/>}
				        arrow="horizontal"
				        onClick={this.onPaidOrdersClick}>
				        已付款订单
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-querendingdan'/>}
				        arrow="horizontal"
				        onClick={this.onConfirmedOrdersClick}>
				        已确认订单
		          	</Item>
		          	<Item
				        thumb={<Icon type='#icon-peisong'/>}
				        arrow="horizontal"
				        onClick={this.onDeliveryOrdersClick}>
				        待配送订单
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-iconfontwancheng'/>}
				        arrow="horizontal"
				        onClick={this.onFinishedOrdersClick}>
				        已完成订单
		          	</Item>
		          	<Item
				        thumb={<Icon type='cross-circle-o'/>}
				        arrow="horizontal"
				        onClick={this.onCancelledOrdersClick}>
				        已取消订单
		          	</Item>
	          	</List>
	          	<WhiteSpace size="lg"/>
	          	<List>
		   	        <Item
				        thumb={<Icon type='#icon-fapiao'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        用户列表
		          	</Item>
		          	<Item
				        thumb={<Icon type='#icon-kefu'/>}
				        arrow="empty"
				        onClick={this.onSoonClick}>
				        开票申请
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-yijian'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        意见反馈
		          	</Item>
		      	</List>
	      	</div>
		);
	}
}

AdminHomePage.title = '管理后台'

AdminHomePage.onBackClick = (dispatch, props)=> ()=>{
	dispatch(routerRedux.push('/shop/home'))
}

AdminHomePage.propTypes = {
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(AdminHomePage);
