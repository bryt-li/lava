import React from 'react';
import { connect } from 'dva';
import styles from './SigninPage.less';
import SigninForm from '../components/SigninForm'
import { Layout, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';

const { Header, Footer, Content } = Layout;

function SigninPage() {

  	return (
	<Layout>
		<Header className={styles.header}>
	        <Link to="/"><Icon type='left' className={styles.backIcon}/></Link>
			<img src={require('../assets/logo.png')} />
		    <h2>会员登录</h2>
		</Header>
		<Content className={styles.content}>
	    	<SigninForm />
		</Content>
		<Footer className={styles.footer}>
			活力火山©2017
		</Footer>
	</Layout>
  );
}

SigninPage.propTypes = {
};

export default connect()(SigninPage);
