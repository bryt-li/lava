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

class AdminOrderListPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch,params} = this.props
		dispatch({
			type:'AdminOrderListPage/componentWillMount',
			payload:{status:params.status}
		})
		this.props.dispatch({
			type:'LayoutUser/setNav',
			payload:{title:'订单列表',backUrl:'/user/admin/home'}
		})
	}

	render(){
	  	const {dispatch, form, orders, loading, title} = this.props
		const { getFieldProps } = form
		if(loading)
			return null

	  	return(
		<div className={styles.container}>
			<Helmet>
		        <title>{title}</title>
		    </Helmet>

	    	<List renderHeader={() => '全部订单'}>
			    {(orders&&orders.length>0)?orders.map((order,i)=>{
			    	return(
			    	<Item key={i} arrow="horizontal" extra={`￥${formatMoney(order.total_price)}元`}
				    	onClick={()=> dispatch(routerRedux.push(`/user/admin/order/show/${order.id}`))}>
				        订单编号：{order.code}
				        <Brief>状态：{formatStatus(order.status)}</Brief>
				    </Item>
				    )
			    }):
			    <Item arrow="horizontal" extra="返回" 
			    	onClick={()=> dispatch(routerRedux.goBack())}>
			    	当前没有订单
			    </Item>
				}
		    </List>
		</div>
		);
	}
}

AdminOrderListPage.propTypes = {
};

const mapStateToProps = (state) => ({
    orders: state.AdminOrderListPage.orders,
    title: state.AdminOrderListPage.ui.title,
    loading: state.loading.effects['AdminOrderListPage/componentWillMount']
});

const FormWrapper = createForm()(AdminOrderListPage);

export default connect(mapStateToProps)(FormWrapper);
