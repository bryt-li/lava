import React from 'react';
import { connect } from 'dva';
import { Modal, Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, InputItem, Toast, TextareaItem } from 'antd-mobile';
import {Helmet} from "react-helmet";
import {  routerRedux } from 'dva/router'
import { createForm } from 'rc-form'

import styles from './index.less'

const config = require("../../config")

const Item = List.Item
const Brief = Item.Brief


const ModalDialog = ({visible, onWarnClose}) => {
  return(
    <Modal
      title=""
      transparent
      maskClosable={false}
      visible={visible}
      onClose={onWarnClose()}
      footer={[{ text: '确定', onPress: () => { onWarnClose()(); } }]}
      >
      <p>对不起，您选择的地址我们暂时无法服务。</p>
      <p>请在长沙市范围内选择离您最近的知名地址。</p>
    </Modal>
  )
}

class AddressPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch} = this.props
		dispatch({type:'AddressPage/componentWillMount',payload:location.query})

		let destination = window.sessionStorage.getItem('address_page_return')
		if(!destination)
			destination = '/shop/home'

		this.props.dispatch({
			type:'LayoutUser/setNav',
			payload:{title:'收货信息',backUrl:destination}
		})
	}

	render(){
		const { dispatch, form, ui, delivery } = this.props
		
		const onWarnClose = () => (e) => {
			if(e) 
				e.preventDefault()
		    dispatch({type:'address_page/updateUI', payload:{showModal:false}})
	    }

		const onErrorClick = () => {
			Toast.info('配送时间内，请您确保手机畅通。');
		}

		const onAddressChange = (address) => {
			dispatch({type:'AddressPage/updateDelivery', payload:{address}})	
		}

		const onNameChange = (name) => {
			dispatch({type:'AddressPage/updateDelivery', payload:{name}})	
		}

		const onPhoneChange = (phone) => {
			let phoneHasError = false
			if (phone.replace(/\s/g, '').length < 11) {
				phoneHasError = true
			}
			dispatch({type:'AddressPage/updateDelivery', payload:{phone}})	
			dispatch({type:'AddressPage/updateUI', payload:{phoneHasError}})
		}

		const onMapClick = () => {
			//save name & phone before redirect to map
			//const {dispatch,location} = this.props
			//const { name, phone } = this.state.delivery

			//todo：离开应用了，这时相当于没有保存用户当前输入
			//dispatch({type:'user/updateDelivery', payload:{name,phone}})

			//微信不支持iframe，必须结束应用跳转走
			window.location = config.mapUrl
		}

		const onSubmit = () => {
			dispatch({type: 'AddressPage/saveDelivery'})
		}

		const { getFieldProps } = form
		const {phoneHasError, nameFocused, showModal} = ui
		const {name, address, city, location, lat, lng, phone} = delivery

	  	return (
		<div className={styles.container}>
			<Helmet>
	            <title>设置收货信息</title>
	        </Helmet>
	        <ModalDialog visible={showModal} onWarnClose={onWarnClose} />
		    <div>
			    <List renderHeader={() => '详细收货地址'}>
				    <Item
			          thumb={<Icon type="#icon-ditu" />}
			          arrow="horizontal"
			          onClick={onMapClick}>
			          从地图上选取点
			          {lat? 
			          	<Brief>{`${city} ${location}`}</Brief>
			          	:
			          	<Brief>无法确定地理坐标</Brief>}
			        </Item>
		        </List>
		        <List renderHeader={() => lat?`收货地址 (${lat.toFixed(2)}, ${lng.toFixed(2)})`:'收货地址'}>
		          <TextareaItem
		            {...getFieldProps('address')}
		            clear
		            value={address?address:''}
		            placeholder="从地图中选取准确的地址，能自动为您减免订单运费哦。"
		            onChange={onAddressChange}
		            rows={5}
		            count={100}
		          />
		        </List>
		        <WhiteSpace />
		        <List renderHeader={() => '联系人如何称呼'}>
		          <InputItem
		            placeholder="张先生、王女士"
		            {...getFieldProps('name')}
		            clear
					onChange={onNameChange}
		            value = {name}>
		            联系人
		          </InputItem>
		        </List>
		        <List renderHeader={() => '收货人联系方式'}>
					<InputItem
					type="phone"
					{...getFieldProps('phone')}
					clear
					placeholder="输入11位电话号码"
					error={phoneHasError}
					onErrorClick={onErrorClick}
					onChange={onPhoneChange}
					value={phone}>
						手机号码
					</InputItem>
				</List>
				<WhiteSpace size="lg"/>
				<WingBlank>
					<Button type="primary" onClick={onSubmit}>保存配送信息</Button>
				</WingBlank>
		    </div>
		</div>
	  	)
	}
}

AddressPage.propTypes = {
};


const mapStateToProps = (state) => ({
	ui: state.AddressPage.ui,
    delivery:state.AddressPage.delivery,
});

const AddressPageWrapper = createForm()(AddressPage);

export default connect(mapStateToProps)(AddressPageWrapper);
