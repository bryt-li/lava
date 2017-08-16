import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, Toast, Steps } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import styles from './index.less';

import {formatMoney} from '../../utils/price'

const Item = List.Item
const Brief = Item.Brief
const Step = Steps.Step;

class AdminOrderShowPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch,params} = this.props
		dispatch({
			type:'AdminOrderShowPage/componentWillMount',
			payload:{id:params.id}
		})
	}

	handleChangeStatusClicked = (status) => () => {
		const {dispatch,order} = this.props
		dispatch({
			type:'AdminOrderShowPage/changeOrderStatus',
			payload: {
				id: order.id,
				status: status
			}
		})
	}

	OrderStatusChangeButtons = ({status}) => {
		return(
		<WingBlank className={styles.buttons} size='lg'>
			{<Button type="primary" disabled={status==0} onClick={this.handleChangeStatusClicked(0)} icon="#icon-icon">未付款订单</Button>}
			{<Button type="primary" disabled={status==1} onClick={this.handleChangeStatusClicked(1)} icon="#icon-qianbao">已付款订单</Button>}
			{<Button type="primary" disabled={status==2} onClick={this.handleChangeStatusClicked(2)} icon="#icon-querendingdan">已确认订单</Button>}
			{<Button type="primary" disabled={status==3} onClick={this.handleChangeStatusClicked(3)} icon="#icon-peisong">待配送订单</Button>}
			{<Button type="primary" disabled={status==4} onClick={this.handleChangeStatusClicked(4)} icon="#icon-iconfontwancheng">已完成订单</Button>}
			{<Button type="primary" disabled={status==5} onClick={this.handleChangeStatusClicked(5)} icon="cross-circle-o">已取消订单</Button>}
		</WingBlank>
		)
	}

	render(){
	  	const {dispatch, form, order, loading} = this.props
	  	if(loading){
	  		return null
	  	}
	  	
	  	if(!order){
	  		return(
			<div className={styles.container}>
			    <h3>没有找到对应的订单</h3>
			</div>
			)
	  	}

		const { getFieldProps } = form
		const {
			code,
			status,
			date, 
			time, 
			items,
			delivery,
			items_price,
			advance_price, 
			delivery_price, 
			total_price
		} = order

		const {name, phone, address} = delivery

	  	return(
		<div className={styles.container}>
	    	<List renderHeader={() => '订单状态'}>
		        <Item extra={code}>订单号</Item>
		        <WhiteSpace size="lg" />
			    <Flex justify="center">
			    	<WingBlank size="sm">
				    	<Steps current={status}>
					      <Step title="下单" icon={<Icon type='#icon-icon' />} description="客户已确认提交订单" />
					      <Step title="付款" icon={<Icon type='#icon-12' />} description="客户已完成订单付款" />
					      <Step title="确认" icon={<Icon type='#icon-querendingdan' />} description="客服已确认订单" />
					      <Step title="配送" icon={<Icon type='#icon-peisong' />} description="进行订单配送" />
					      <Step title="完成" icon={<Icon type='#icon-iconfontwancheng' />} description="订单已完成" />
					      <Step title="取消" icon={<Icon type='#icon-iconfontwancheng' />} description="订单已取消" />
					    </Steps>
				    </WingBlank>
			    </Flex>
		    	<WhiteSpace size="sm" />
				<WingBlank size="sm">
			        <Item extra={formatMoney(total_price)}>
					    {status>0?'已付金额':'应付金额'}
			        </Item>
				</WingBlank>
			</List>

			<WhiteSpace size="lg"/>

			<List renderHeader={() => '餐品'}>
	    		{items.map((o,k)=>{
	    			let saving = o.price-o.order_price
	    			if(saving>0)
	    				return(<Item key={k} thumb={<Icon type="#icon-zhe" />} extra={`${formatMoney(o.order_price)}元 省${formatMoney(saving)}`}>{o.name}</Item>)
	    			else
	    				return(<Item key={k} thumb={<Icon type="#icon-zheng" />} extra={`${formatMoney(o.order_price)}元`}>{o.name}</Item>)
	    		})}
	    		<Item thumb={<Icon type="#icon-12" />} extra={`${formatMoney(items_price)}元`}>
		        	餐品总价
	        	</Item>
		    </List>

		    <List renderHeader={() => '时间'}>
				<Item extra={date.format("yyyy-MM-dd")}>
		        	配送日期
	        	</Item>
				<Item extra={time}>
		        	配送时间
	        	</Item>
		    </List>

		    <List renderHeader={() => '配送'}>
		    	<WingBlank size='lg'>
			        <Item extra={name}>联系人</Item>
			    	<Item extra={phone}>联系电话</Item>
				    <List renderHeader={() => '收货地址'}>
				        <Item arrow="empty" wrap>
				        	{address}
				        </Item>
			        </List>
			        <Item thumb={<Icon type="#icon-12" />} 
			        	extra={`${formatMoney(delivery_price)}元`}>
		        		配送费
	        		</Item>
		        </WingBlank>
	    	</List>

	    	<WhiteSpace size="sm"/>

	    	<List renderHeader={() => '订单总价'}>
		        <Item extra={`${formatMoney(items_price)}元`}>
	        		餐品费
        		</Item>
		        {(advance_price<0) ?
			        <Item extra={`${formatMoney(advance_price)}元`}>
		        		预订折扣
	        		</Item>
	        		:
	        		null
	        	}
		        <Item extra={`${formatMoney(delivery_price)}元`}>
	        		配送费
        		</Item>
		        <Item thumb={<Icon type="#icon-12" />} 
		        	extra={`${formatMoney(total_price)}元`}>
	        		订单总价
        		</Item>
	    	</List>

			<WhiteSpace size="sm"/>

	    	<List renderHeader={() => '订单操作'}>
		    	<this.OrderStatusChangeButtons status={status} />
		    </List>
		</div>
		);
	}
}

AdminOrderShowPage.propTypes = {
};

AdminOrderShowPage.title = '查看订单'

AdminOrderShowPage.onBackClick = (dispatch, props)=> ()=>{
	dispatch(routerRedux.goBack())
}

const mapStateToProps = (state) => ({
    order: state.AdminOrderShowPage.order,
    loading: state.loading.effects['AdminOrderShowPage/componentWillMount']
});

const FormWrapper = createForm()(AdminOrderShowPage);

export default connect(mapStateToProps)(FormWrapper);
