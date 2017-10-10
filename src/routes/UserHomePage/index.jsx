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

class UserHomePage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.dispatch({
			type:'LayoutUser/setNav',
			payload:{title:'火山轻食会员',backUrl:'/shop/home'}
		})
	}

	onOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/user/order/list'))
	}

	onAddressClick = () => {
		window.sessionStorage.setItem('address_page_return', this.props.location.pathname)
		this.props.dispatch(routerRedux.push('/user/address'))
	}

	onSoonClick = () => {
		Toast.info('正在努力上线中');
	}

	onLogoutClicked = () => {
		this.props.dispatch({type:'UserHomePage/logout'})
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
				        onClick={this.onOrdersClick}>
				        我的订单
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-daijinquan'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        我的代金券
		          	</Item>
		          	<Item
				        thumb={<Icon type='#icon-jifen'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        我的积分
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-qianbao'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        我的钱包
		          	</Item>
		          	<Item
				        thumb={<Icon type='#icon-ditu'/>}
				        arrow="horizontal"
				        onClick={this.onAddressClick}>
				        我的送餐地址
		          	</Item>
	          	</List>
	          	<WhiteSpace size="lg"/>
	          	<List>
		   	        <Item
				        thumb={<Icon type='#icon-fapiao'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        申请发票
		          	</Item>
		          	<Item
				        thumb={<Icon type='#icon-kefu'/>}
				        arrow="empty"
				        extra='84114810'
				        onClick={() => {}}>
				        联系客服
		          	</Item>
		   	        <Item
				        thumb={<Icon type='#icon-yijian'/>}
				        arrow="horizontal"
				        onClick={this.onSoonClick}>
				        意见反馈
		          	</Item>
		      	</List>

					<WhiteSpace size="lg"/>
				<WingBlank>
					<Button type="primary" onClick={this.onLogoutClicked}>退出微信登录</Button>
				</WingBlank>
	      	</div>
		);
	}
}

UserHomePage.propTypes = {
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(UserHomePage);
