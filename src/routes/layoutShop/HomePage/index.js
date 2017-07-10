import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';

import styles from './index.less';

function HomePage() {
  return (
  	<div>
  		<h1>home</h1>
  		<ul>
	  		<li><Link to="/item/swybsm">One</Link></li>
	  		<li><Link to="/item/2">Two</Link></li>
	  		<li><Link to="/item/3">Tree</Link></li>
  		</ul>
	</div>
  );
}

HomePage.propTypes = {
};

export default connect()(HomePage);
