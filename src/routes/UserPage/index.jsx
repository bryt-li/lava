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

/*

import FooterInfo from '../components/FooterInfo'

import { Layout, Row, Col, Icon, Avatar, Menu } from 'antd';
const { Header, Footer, Content } = Layout;
const SubMenu = Menu.SubMenu;

function UserPage() {
	return (
	<Layout>
		<Header className={styles.header}>
			<Row>
				<Col span={4}>
			        <Link to="/"><Icon type='left' className={styles.backIcon}/></Link>
				</Col>
				<Col span={16}>
					<Avatar size="large" icon="user" className={styles.userIcon}/>
				</Col>
				<Col span={4}></Col>
		    </Row>
		    <h3>15388031573</h3>
		    <h4>欢迎您</h4>
		</Header>
		<Content className={styles.content}>
			<Menu>
		    	<SubMenu key="sub1" title={<span><Icon type="shop" /><span>我的订单</span></span>}></SubMenu>
		    	<SubMenu key="sub2" title={<span><Icon type="gift" /><span>我的代金券</span></span>}></SubMenu>
		    	<SubMenu key="sub3" title={<span><Icon type="red-envelope" /><span>我的积分</span></span>}></SubMenu>
		    	<SubMenu key="sub4" title={<span><Icon type="wallet" /><span>我的钱包</span></span>}></SubMenu>
		    	<SubMenu key="sub5" title={<span><Icon type="car" /><span>我的送餐地址</span></span>}></SubMenu>
		    </Menu>
	    	<hr />
		    <Menu>
		    	<SubMenu key="sub6" title={<span><Icon type="schedule" /><span>申请发票</span></span>}></SubMenu>
		    	<SubMenu key="sub7" title={<span><Icon type="phone" /><span>联系客服</span></span>}></SubMenu>
		    	<SubMenu key="sub8" title={<span><Icon type="mail" /><span>意见反馈</span></span>}></SubMenu>
		    </Menu>
	    	<hr />
		</Content>
		<Footer className={styles.footer}>
			<FooterInfo/>
		</Footer>
	</Layout>
  );
}
*/

class UserPage extends React.Component {
	constructor(props) {
		super(props)
	}

	onOrdersClick = () => {
		this.props.dispatch(routerRedux.push('/order/list'))
	}

	onAddressClick = () => {
		window.sessionStorage.setItem('address_page_return', this.props.location.pathname)
		this.props.dispatch(routerRedux.push('/address'))
	}

	onSoonClick = () => {
		Toast.info('正在努力上线中');
	}

	onLogoutClicked = () => {
		this.props.dispatch({type:'user/logout'})
	}

	render(){
	  	const {dispatch, user} = this.props

		return (
			<div>
				<NavBar
			        leftContent="返回"
			        mode="light"
			        onLeftClick={() => dispatch(routerRedux.push('/'))}
			    >
			    	活力火山会员
			    </NavBar>
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
			</div>
		);
	}
}

UserPage.propTypes = {
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(UserPage);
