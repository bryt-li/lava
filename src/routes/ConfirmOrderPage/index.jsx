import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import { Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker } from 'antd-mobile';
import ReactLoading from 'react-loading';
import {Helmet} from "react-helmet";
import { createForm } from 'rc-form';

import moment from 'moment';
import 'moment/locale/zh-cn';

import styles from './index.less';

const Item = List.Item
const Brief = Item.Brief


const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const delivery_time = [
	{label:'12:30 以前',value:1},
	{label:'two',value:2},
	{label:'three',value:3},
]

class ConfirmOrderPage extends React.Component {
	state = {
		date: zhNow,
	}
	onChange = (date) => {
		this.setState({
			date,
		});
	}

	render(){
	  	const {dispatch, form, order} = this.props
		const { getFieldProps } = form

		if(order.length<1){
			return (
			<Helmet>
	            <meta charSet="utf-8" />
	            <title></title>
	            <meta http-equiv="refresh" content="0; url=/" />
	        </Helmet>
			)
		}

	  	return(
		<div className={styles.container}>
			<Helmet>
	            <meta charSet="utf-8" />
	            <title>订单确认</title>
	        </Helmet>
		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={() => dispatch(routerRedux.goBack())}
		    >
		    	订单确认
		    </NavBar>

		    <div>
		    	<List renderHeader={() => '餐品信息'}>
		    		{order.map((o,k)=>{
	    				return(<Item key={k} thumb={o.discount?"/res/discount.png":"/res/no_discount.png"} extra={o.price.toFixed(1).toString()+'  × 1'}>{o.item.name}</Item>)
		    		})}
			    </List>

			    <List renderHeader={() => '送餐信息'}>
					
					<DatePicker
			          mode="date"
			          title="选择配送日期"
			          extra=""
			          {...getFieldProps('date1', {

			          })}
			          minDate={minDate}
			          maxDate={maxDate}
			          value={this.state.date}
			          onChange={this.onChange}
			        >
			        	<Item arrow="horizontal" multipleLine thumb="/res/delivery.png">
				        	选择日期<Brief>提前1天，立减5元</Brief>
			        	</Item>
			        </DatePicker>

					<Picker data={delivery_time} cols={1} {...getFieldProps('time')}>
						<Item arrow="horizontal">选择时间</Item>
			        </Picker>

			    </List>

		    </div>
		</div>
		);
	}
}

ConfirmOrderPage.propTypes = {
};

const mapStateToProps = (state) => ({
    menu: state.app.menu,
    order: state.cart.order
});

const FormWrapper = createForm()(ConfirmOrderPage);

export default connect(mapStateToProps)(FormWrapper);
