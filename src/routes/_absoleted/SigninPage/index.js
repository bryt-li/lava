import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import SigninForm from '../../components/SigninForm'
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
	</Layout>
  );
}

SigninPage.propTypes = {
};

export default connect()(SigninPage);
