import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, Radio, Toast } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import {calculateAdvancePrice, calculateDeliveryDistance, calculateDeliveryPrice} from '../../utils/price'
import {getOrderDate,getOrderTime,getOrderPayment} from '../../utils/order'
import {formatMoney} from '../../utils/price'

import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief
const RadioItem = Radio.RadioItem;

class OrderCreatePage extends React.Component {
	constructor(props) {
		super(props);

		const {order_items, user, delivery, dispatch, location} = props
		if(order_items.length==0||!user)
			return

		let items_price = 0
		for(var i=0;i<order_items.length;i++)
			items_price += order_items[i].order_price

		const {minDate, date, maxDate} = getOrderDate()
		const advance_price = calculateAdvancePrice(date)

		const {availableTimes, time} = getOrderTime()

		let deliveryDistance = null
		let delivery_price = null
		const {lat,lng} = delivery?delivery:{lat:null,lng:null}
		if(lat!=null && lng!=null){
			deliveryDistance = calculateDeliveryDistance(lat,lng)
			delivery_price = calculateDeliveryPrice(items_price, lat,lng)
		}

		const {availablePayments, payment} = getOrderPayment()

		let total_price = null
		if(delivery_price!=null)
			total_price = items_price + advance_price + delivery_price

		this.state = {
			items_price,
			minDate: minDate,
			date,
			maxDate: maxDate,
			advance_price,
			availableTimes: availableTimes,
			time,
			deliveryDistance: deliveryDistance,
			availablePayments: availablePayments,
			delivery_price,
			payment,
			total_price,
		}
	}

	onDateChange = (date) => {
		const advance_price = calculateAdvancePrice(date)
		let total_price = null
		if(this.state.delivery_price!=null)
			total_price = this.state.items_price+this.state.delivery_price+advance_price

		this.setState({
			...this.state,
			date,
			advance_price,
			total_price,
		});
	}

	onTimeChange = (time) =>{
		this.setState({
			...this.state,
			time
		})
	}

	onPaymentChange = (payment) => {
		Toast.info('余额支付正在开发中')
		/*
		this.setState({
			...this.state,
			payment
		});
		*/
	}

	onChangeDeliveryClick = () =>{
		const {dispatch,location} = this.props
		window.sessionStorage.setItem('address_page_return', location.pathname)
		dispatch(routerRedux.push('/address'))
	}

	onSubmit = () => {
	  	const {dispatch, order_items, delivery, user} = this.props

		const {
			date,
			time, 
			items_price,
			advance_price,
			delivery_price,
			total_price,
			payment,
		} = this.state

		if(delivery_price==null || delivery_price > 8000){
			Toast.info('请您填写有效的收货地址')
			return
		}

		const order = {
			date,
			time,
			order_items,
			delivery,
			items_price,
			advance_price,
			delivery_price,
			total_price,
			payment,
		}

		dispatch({type:'order_create/createOrder',payload:order})
	}

	render(){
	  	const {dispatch, form, order_items, user, delivery} = this.props
		if(order_items.length==0||!user)
			return null

		const { getFieldProps } = form

		const {name, address, phone, lat, lng} = delivery?delivery:{
			name:null,
			address:null,
			phone:null,
			lat:null,
			lng:null
		}

		const {
			minDate,date,maxDate, 
			availableTimes,	time, 
			items_price, advance_price,
			delivery_price, deliveryDistance,
			availablePayments,
			payment,
			total_price
		} = this.state

	  	return(
		<div className={styles.container}>
			<Helmet>
	            <title>确认订单</title>
	        </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => dispatch(routerRedux.push('/'))}
		    >
		    	确认订单
		    </NavBar>
		    <div>
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
					<DatePicker
			          mode="date"
			          title="选择配送日期"
			          extra=""
			          {...getFieldProps('date', {
			          })}
			          minDate={minDate}
			          maxDate={maxDate}
			          value={date}
			          onChange={this.onDateChange}
			        >
			        	<Item arrow="horizontal" multipleLine thumb={<Icon type="#icon-riqi" />}>
				        	配送日期<Brief>提前1天，立减5元</Brief>
			        	</Item>
			        </DatePicker>
					<Picker
						data={availableTimes} cols={1}
						onOk={v => this.onTimeChange(v[0])}
						{...getFieldProps('time',{
							initialValue:[time]
						})}>
						<Item arrow="horizontal" thumb={<Icon type="#icon-shijian" />}>
							配送时间
						</Item>
			        </Picker>
			        {(advance_price<0) ?
				        <Item thumb={<Icon type="#icon-12" />} extra={`${formatMoney(advance_price)}元`}>
				        预订折扣
			        	</Item>
			        	:
			        	null
			        }
			    </List>

			    <List renderHeader={() => '配送'}>
			    	<WingBlank size='lg'>
				    	<Item
				          thumb={<Icon type="#icon-peisong" />}
				          arrow="horizontal"
				          onClick={this.onChangeDeliveryClick}>
				          修改收货地址和联系人
				        </Item>
				        <Item extra={name}>联系人</Item>
				    	<Item extra={phone}>联系电话</Item>
					    <List renderHeader={() => '收货地址'}>
					        <Item arrow="empty" wrap>
					        	{address}
					        </Item>
				        </List>
				        <Item extra={deliveryDistance!=null?`${deliveryDistance.toFixed(2)}公里`:'未知'}>
				        	配送半径
				        </Item>
				        <Item thumb={<Icon type="#icon-12" />} 
				        	extra={delivery_price!=null?`${formatMoney(delivery_price)}元`:'未知'}>
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
			        <Item extra={delivery_price!=null?`${formatMoney(delivery_price)}元`:'未知'}>
		        		配送费
	        		</Item>
			        <Item thumb={<Icon type="#icon-12" />} 
			        	extra={total_price?`${formatMoney(total_price)}元`:'未知'}>
		        		应付
	        		</Item>
		    	</List>

		    	<List renderHeader={() => '支付方式'}>
			        {availablePayments.map(i => (
			        <RadioItem key={i.value} checked={payment === i.value} onChange={() => this.onPaymentChange(i.value)}>
			        	{i.label}
			        </RadioItem>
			        ))}
			    </List>

		    	<WhiteSpace size="lg"/>

				<WingBlank>
					<Button type="primary" onClick={this.onSubmit}>提交订单</Button>
				</WingBlank>

		    </div>
		</div>
		);
	}
}

OrderCreatePage.propTypes = {
};

const mapStateToProps = (state) => ({
    order_items: state.app.order_items,
    user: state.user,
    delivery: state.user.delivery,
});

const FormWrapper = createForm()(OrderCreatePage);

export default connect(mapStateToProps)(FormWrapper);
