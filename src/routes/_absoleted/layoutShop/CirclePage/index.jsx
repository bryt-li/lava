import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';

import styles from './index.less';


const CirclePage = () => {
	return (
		<WingBlank size="lg">
			<h1>Circle</h1>
		</WingBlank>
	);
}

CirclePage.propTypes = {
	loading: PropTypes.bool,
	dispatch: PropTypes.func,
	params: PropTypes.object
};

export default connect()(CirclePage);
