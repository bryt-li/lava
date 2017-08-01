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
		const {dispatch} = this.props
		dispatch({type:'order_show/wechatPay'})
	}

	render(){
	  	const {dispatch, form, order} = this.props  	

	  	if(!order){
	  		return(
			<div className={styles.container}>
				<Helmet>
		            <meta charSet="utf-8" />
		            <title>查看订单</title>
		        </Helmet>
			    <NavBar
			        leftContent="返回"
			        mode="light"
			        onLeftClick={() => dispatch(routerRedux.push('/shop/order/list'))}
			    >
			    	查看订单
			    </NavBar>
			    <div>
			    </div>
			</div>
			)
	  	}

		const { getFieldProps } = form
		const {
			code,
			status,
			date, 
			time, 
			order_items,
			delivery,
			items_price,
			advance_price, 
			delivery_price, 
			total_price
		} = order

		const {name, phone, address} = delivery

	  	return(
		<div className={styles.container}>
			<Helmet>
	            <meta charSet="utf-8" />
	            <title>查看订单</title>
	        </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => dispatch(routerRedux.push('/shop/order/list'))}
		    >
		    	查看订单
		    </NavBar>
		    <div>
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
		    		{order_items.map((o,k)=>{
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
		</div>
		);
	}
}

OrderShowPage.propTypes = {
};

const mapStateToProps = (state) => ({
    order: state.order_show.order,
});

const FormWrapper = createForm()(OrderShowPage);

export default connect(mapStateToProps)(FormWrapper);
