import React from 'react';
import { connect } from 'dva';
import {  Link, routerRedux, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';

import styles from './index.less';

const LayoutShop = require('../LayoutShop/');
const LayoutUser = require('../LayoutUser/');


function LayoutDefault({ children, dispatch, location, loading }) {

  return (
    <div className={styles.container}>
      <Switch>
        <Route path='/shop' component={LayoutShop} />
        <Route path='/user' component={LayoutUser} />
      </Switch>

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

export default connect(mapStateToProps)(LayoutDefault);
