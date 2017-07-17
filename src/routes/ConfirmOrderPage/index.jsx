import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";

import styles from './index.less';

class ConfirmOrderPage extends React.Component{

	constructor (props) {
    	super(props)
	}
	
  	render(){
  		return(
		<div className={styles.container}>
			<Helmet>
                <meta charSet="utf-8" />
                <title>订单确认</title>
            </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => this.props.dispatch(routerRedux.goBack())}
		        rightContent={[
		          <Icon key="0" type="search" style={{marginRight: '0.32rem'}} />,
		          <Icon key="1" type="ellipsis" />
		        ]}>
		    	订单确认
		    </NavBar>

		    <div style={{display:'block',height:'200px'}}/>

		</div>
  		);
  	}
}

ConfirmOrderPage.propTypes = {
	dispatch: PropTypes.func,
	params: PropTypes.object,
	menu: PropTypes.object,
};

const mapStateToProps = (state) => ({
    menu: state.app.menu,
});


export default connect(mapStateToProps)(ConfirmOrderPage);
