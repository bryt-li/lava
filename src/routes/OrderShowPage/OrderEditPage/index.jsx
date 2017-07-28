import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';


import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief


class OrderEditPage extends React.Component {
	constructor(props) {
		super(props);

	}

	render(){
	  	const {dispatch, form, order_list} = this.props
		const { getFieldProps } = form


	  	return(
		<div className={styles.container}>
			<Helmet>
	            <meta charSet="utf-8" />
	            <title>我的订单</title>
	        </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => dispatch(routerRedux.push('/'))}
		    >
		    	我的订单
		    </NavBar>
		    <div>
		    	
		    </div>
		</div>
		);
	}
}

OrderEditPage.propTypes = {
};

const mapStateToProps = (state) => ({
    order_list: state.app.order_list,
});

const FormWrapper = createForm()(OrderEditPage);

export default connect(mapStateToProps)(FormWrapper);
