import React from 'react';
import { connect } from 'dva';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import {  NavBar, Icon, Input } from 'antd-mobile';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";

import styles from './index.less';

function LayoutUser({ children, dispatch, location, props }) {

	return (
	<div className={styles.container}>
		<Helmet>
	        <title>{children.type.title}</title>
	    </Helmet>
		<NavBar
	        leftContent={'返回'}
	        mode="light"
	        onLeftClick={children.type.onBackClick(dispatch, props)}
	    >
	    	{children.type.title}
	    </NavBar>
	    <div>
	    	<div>
		        {children}
	        </div>
	      	<div style={{display:'block',height:'300px'}} />
        </div>
    </div>
	);
}

LayoutUser.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect()(LayoutUser);
