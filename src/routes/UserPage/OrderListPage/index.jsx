import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import { formatStatus } from '../../../utils/order.js'
import { formatMoney } from '../../../utils/price.js'

import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief

class OrderListPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
	  	const {dispatch, form, orders} = this.props
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
		        onLeftClick={() => dispatch(routerRedux.push('/shop/user'))}
		    >
		    	我的订单
		    </NavBar>
		    <div>
		    	<List renderHeader={() => '全部订单'}>
		    {(orders&&orders.length>0)?orders.map((order,i)=>{
		    	return(
		    	<Item key={i} arrow="horizontal" extra={`￥${formatMoney(order.total_price)}元`}
			    	onClick={()=> dispatch(routerRedux.push(`/shop/order/show/${order.id}`))}>
    		        订单编号：{order.code}
			        <Brief>状态：{formatStatus(order.status)}</Brief>
			    </Item>
			    )
		    }):
			    <Item arrow="horizontal" extra="去下单" 
			    	onClick={()=> dispatch(routerRedux.push('/shop/'))}>
			    	当前没有订单
			    </Item>
			}
			    </List>
		    </div>

		    <div style={{display:'block',height:'500px'}} />
		</div>
		);
	}
}

OrderListPage.propTypes = {
};

const mapStateToProps = (state) => ({
    orders: state.order_list.orders,
});

const FormWrapper = createForm()(OrderListPage);

export default connect(mapStateToProps)(FormWrapper);
