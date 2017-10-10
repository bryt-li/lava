import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, Radio, Toast } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import {formatMoney} from '../../utils/price'

import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief
const RadioItem = Radio.RadioItem;

class CartPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {dispatch} = this.props
		dispatch({type:'CartPage/componentWillMount'})

		this.props.dispatch({
			type:'LayoutUser/setNav',
			payload:{title:'购物车',backUrl:'/shop/home'}
		})

	}

	render(){
		const { dispatch, form, location, ui, order } = this.props

		const onDateChange = (date) => {
			dispatch({type:'CartPage/updateDate',payload:date})
		}

		const onTimeChange = (time) =>{
			dispatch({type:'CartPage/updateTime',payload:time})
		}

		const onPaymentChange = (payment) => {
			Toast.info('余额支付正在开发中')
		}

		const onChangeDeliveryClick = () => {
			window.sessionStorage.setItem('address_page_return', location.pathname)
			dispatch(routerRedux.push('/user/address'))
		}

		const onSubmit = () => {
			dispatch({type:'CartPage/createOrder'})
		}

		const { getFieldProps } = form
		if(!order.items)
			return null
		
		return(
		<div className={styles.container}>
			<Helmet>
	            <title>确认订单</title>
	        </Helmet>
		    <div>
		    	<List renderHeader={() => '餐品'}>
		    		{order.items.map((o,k)=>{
		    			let saving = o.price-o.order_price
		    			if(saving>0)
		    				return(<Item key={k} thumb={<Icon type="#icon-zhe" />} extra={`${formatMoney(o.order_price)} 省${formatMoney(saving)}`}>{o.name}</Item>)
		    			else
		    				return(<Item key={k} thumb={<Icon type="#icon-zheng" />} extra={`${formatMoney(o.order_price)}`}>{o.name}</Item>)
		    		})}
		    		<Item thumb={<Icon type="#icon-12" />} extra={`${formatMoney(order.items_price)}元`}>
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
			          minDate={ui.minDate}
			          maxDate={ui.maxDate}
			          value={order.date}
			          onChange={onDateChange}
			        >
			        	<Item arrow="horizontal" multipleLine thumb={<Icon type="#icon-riqi" />}>
				        	配送日期<Brief>提前1天，立减5元</Brief>
			        	</Item>
			        </DatePicker>
					<Picker
						data={ui.availableTimes} cols={1}
						onOk={v => onTimeChange(v[0])}
						{...getFieldProps('time',{
							initialValue:[order.time]
						})}>
						<Item arrow="horizontal" thumb={<Icon type="#icon-shijian" />}>
							配送时间
						</Item>
			        </Picker>
			        {(order.advance_price<0) ?
				        <Item thumb={<Icon type="#icon-12" />} extra={`${formatMoney(order.advance_price)}元`}>
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
				          onClick={onChangeDeliveryClick}>
				          修改收货地址和联系人
				        </Item>
				        <Item extra={order.delivery.name}>联系人</Item>
				    	<Item extra={order.delivery.phone}>联系电话</Item>
					    <List renderHeader={() => '收货地址'}>
					        <Item arrow="empty" wrap>
					        	{order.delivery.address}
					        </Item>
				        </List>
				        <Item extra={ui.deliveryDistance!=null?`${ui.deliveryDistance.toFixed(2)}公里`:'未知'}>
				        	配送半径
				        </Item>
				        <Item thumb={<Icon type="#icon-12" />} 
				        	extra={order.delivery_price!=null?`${formatMoney(order.delivery_price)}元`:'未知'}>
			        		配送费
		        		</Item>
			        </WingBlank>
		    	</List>

		    	<WhiteSpace size="sm"/>
		    	<List renderHeader={() => '订单总价'}>
			        <Item extra={`${formatMoney(order.items_price)}元`}>
		        		餐品费
	        		</Item>
			        {(order.advance_price<0) ?
				        <Item extra={`${formatMoney(order.advance_price)}元`}>
			        		预订折扣
		        		</Item>
		        		:
		        		null
		        	}
			        <Item extra={order.delivery_price!=null?`${formatMoney(order.delivery_price)}元`:'未知'}>
		        		配送费
	        		</Item>
			        <Item thumb={<Icon type="#icon-12" />} 
			        	extra={order.total_price!=null?`${formatMoney(order.total_price)}元`:'未知'}>
		        		应付
	        		</Item>
		    	</List>

		    	<List renderHeader={() => '支付方式'}>
			        {ui.availablePayments.map(i => (
			        <RadioItem key={i.value} checked={order.payment === i.value} onChange={() => onPaymentChange(i.value)}>
			        	{i.label}
			        </RadioItem>
			        ))}
			    </List>

		    	<WhiteSpace size="lg"/>

				<WingBlank>
					<Button type="primary" onClick={onSubmit}>提交订单</Button>
				</WingBlank>
		    </div>
		</div>
		)
	}
}

CartPage.propTypes = {
};

const mapStateToProps = (state) => ({
    ui: state.CartPage.ui,
    order: state.CartPage.order,
});

const FormWrapper = createForm()(CartPage);

export default connect(mapStateToProps)(FormWrapper);
