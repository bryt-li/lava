import React from 'react';
import { connect } from 'dva';
import {  routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';
import { Link } from 'dva/router';

import styles from './index.less';

function LayoutDefault({ children, dispatch, location, loading }) {

  return (
    <div className={styles.container}>
      	{children}
      	{loading?
	      	(<ActivityIndicator
	            toast
	            text="全力加载..."
	            animating={true}
	      	/>):null
      	}
    </div>
  );
}

LayoutDefault.propTypes = {
}

const mapStateToProps = (state) => ({
	loading: state.loading.global
})

export default connect()(LayoutDefault);
