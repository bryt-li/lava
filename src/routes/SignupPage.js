import React from 'react';
import { connect } from 'dva';
import styles from './SignupPage.less';
import SignupForm from '../components/SignupForm';
import { Layout, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';

const { Header, Footer, Content } = Layout;

function SignupPage() {
	return (
	<Layout>
		<Header className={styles.header}>
	        <Link to="/"><Icon type='left' className={styles.backIcon}/></Link>
		    <h2>填写注册信息</h2>
		</Header>
		<Content className={styles.content}>
	    	<SignupForm />
		</Content>
		<Footer className={styles.footer}>
			活力火山©2017
		</Footer>
	</Layout>
  );
}

SignupPage.propTypes = {
};

export default connect()(SignupPage);
