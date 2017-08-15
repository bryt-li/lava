import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import { formatStatus } from '../../utils/order.js'
import { formatMoney } from '../../utils/price.js'

import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief

class OrderListPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch,params} = this.props
		dispatch({type:'OrderListPage/componentWillMount'})
	}

	render(){
	  	const {dispatch, form, orders, loading} = this.props
		const { getFieldProps } = form
		if(loading)
			return null

	  	return(
		<div className={styles.container}>
	    	<List renderHeader={() => '全部订单'}>
	    {(orders&&orders.length>0)?orders.map((order,i)=>{
	    	return(
	    	<Item key={i} arrow="horizontal" extra={`￥${formatMoney(order.total_price)}元`}
		    	onClick={()=> dispatch(routerRedux.push(`/user/order/show/${order.id}`))}>
		        订单编号：{order.code}
		        <Brief>状态：{formatStatus(order.status)}</Brief>
		    </Item>
		    )
	    }):
		    <Item arrow="horizontal" extra="去下单" 
		    	onClick={()=> dispatch(routerRedux.push('/shop/home'))}>
		    	当前没有订单
		    </Item>
		}
		    </List>
		</div>
		);
	}
}

OrderListPage.propTypes = {
};


OrderListPage.title = '我的订单'

OrderListPage.onBackClick = (dispatch, props)=> ()=>{
	dispatch(routerRedux.push('/user/home'))
}

const mapStateToProps = (state) => ({
    orders: state.OrderListPage.orders,
    loading: state.loading.effects['OrderListPage/componentWillMount']
});

const FormWrapper = createForm()(OrderListPage);

export default connect(mapStateToProps)(FormWrapper);
