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

class OrderShowPage extends React.Component {
	constructor(props) {
		super(props);
	}

	handlePayClicked = () => {

		const {dispatch,order} = this.props
		const url = `/user/wechatpay/${order.id}`

		//ios下的微信浏览器没办法正常刷新SPA应用的URL
		//所以这里只好重新进入应用
		//才能和微信支付配置的安全URL匹配上
		//window.location = url
		dispatch(routerRedux.push(url))
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
					      <Step title="配送" icon={<Icon type='#icon-peisong' />} description="快递完成订单配送" />
					      <Step title="完成" icon={<Icon type='#icon-iconfontwancheng' />} description="订单已完成" />
					      <Step title="取消" icon={<Icon type='#icon-iconfontwancheng' />} description="订单已取消" />
					    </Steps>
				    </WingBlank>
			    </Flex>
		    	<WhiteSpace size="sm" />
				<WingBlank size="sm">
			        <Item extra={formatMoney(total_price)}>
			    {status>0?
			    	'已付金额'
			    	:
			    	'应付金额'
				}
			        </Item>
    		    	<WhiteSpace size="lg"/>
			    {status>0?null:
					<Button type="primary" onClick={this.handlePayClicked}>立即付款</Button>
			    }
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
		</div>
		);
	}
}

OrderShowPage.propTypes = {
};


OrderShowPage.title = '查看订单'

OrderShowPage.onBackClick = (dispatch, props)=> ()=>{
	dispatch(routerRedux.push('/user/order/list'))
}


const mapStateToProps = (state) => ({
    order: state.OrderShowPage.order,
    loading: state.loading.effects['OrderShowPage/getOrder']
});

const FormWrapper = createForm()(OrderShowPage);

export default connect(mapStateToProps)(FormWrapper);
