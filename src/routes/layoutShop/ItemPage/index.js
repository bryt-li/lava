import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';

import styles from './index.less';

function ItemPage({params}) {
  return (
  	<div>
  		<h1>Item: {params.id}</h1>
	</div>
  );
}

ItemPage.propTypes = {
	params: PropTypes.object
};

export default connect()(ItemPage);
