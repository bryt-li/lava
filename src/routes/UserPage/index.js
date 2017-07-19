import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";

const config = require('../../config')

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

function UserPage({dispatch, location, user}) {
	//get referer
	const referer = location.hash.replace('#','');
	const caller = location.pathname+location.hash;

	if(user.id!=null){
		//return closed page
		return (
			<div>
				<h1>用户页面</h1>
				<a href={`${config.api.logout}?redirect=${encodeURIComponent('/')}`}><h1>注销</h1></a>
				<Link to="/"><h1>Home</h1></Link>
			</div>
		);
	}else{
		//redirect to login
		return (
			<Helmet>
				<meta charSet="utf-8" />
				<title>用户登录</title>
				<meta http-equiv="refresh" 
				content={`0; url=${config.api.login}?host=${window.location.origin}&caller=${encodeURIComponent(caller)}&referer=${encodeURIComponent(referer)}`} />
			</Helmet>
		);
	}
}

UserPage.propTypes = {
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(UserPage);
