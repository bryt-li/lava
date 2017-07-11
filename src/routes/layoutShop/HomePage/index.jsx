import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './index.less';

function HomePage() {
  return (
  	<div>
  		<h1>home</h1>
  		<ul>
	  		<li><Link to="/item/staples/swybsm">三文鱼菠色面</Link></li>
	  		<li><Link to="/item/staples/sbhmkj">桑巴红米烤鸡</Link></li>
	  		<li><Link to="/item/3">Tree</Link></li>
  		</ul>
	</div>
  );
}

HomePage.propTypes = {
};

export default connect()(HomePage);
