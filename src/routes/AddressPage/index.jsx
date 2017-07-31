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

const NULL_DELIVERY = {
  id: null,
  name:'',
  phone:'',
  address:'',
  city:'',
  location:'',
  lat:null,
  lng:null
}

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

		const {user, delivery, dispatch, location} = props

		console.log(user)
		if(!user.id){
			dispatch(routerRedux.replace(`/login#${location.pathname}`))
			return
		}

		this.state = {
			delivery: delivery?delivery:NULL_DELIVERY,
		    hasError: false,
		    focusedName: false
		}
	}

	onWarnClose = () => (e) => {
		if(e)
        	e.preventDefault();

	    this.props.dispatch({type:'address/updateModel', payload:false})
    }

	componentWillReceiveProps(nextProps) {
		this.setState({...this.state, delivery: {...this.state.delivery, ...nextProps.delivery}});
	}

	onErrorClick = () => {
		if (this.state.hasError) {
		  Toast.info('配送时间内，请您确保手机畅通。');
		}
	}
	onAddressChange = (address) => {
		this.setState({...this.state, delivery: {...this.state.delivery, address}});
	}
	onNameChange = (name) => {
		this.setState({...this.state, delivery: {...this.state.delivery, name}});
	}
	onPhoneChange = (phone) => {
		let hasError = false
		if (phone.replace(/\s/g, '').length < 11) {
			hasError = true
		}
		this.setState({...this.state, hasError, delivery: {...this.state.delivery,phone}});
	}

	onMapClick = () => {
		//save name & phone before redirect to map
		const {dispatch,location} = this.props
		const { name, phone } = this.state.delivery

		//todo：离开应用了，这时相当于没有保存用户当前输入
		dispatch({type:'user/updateDelivery', payload:{name,phone}})

		//微信不支持iframe，必须结束应用跳转走
		window.location = config.mapUrl
	}

	onSubmit = () => {
		const {delivery, hasError} = this.state
		const {id, name, address, lat, lng, phone} = delivery
		if(!address || address=='' || !lat || !lng){
			Toast.info('请在地图中选取收货地址')
			return
		}
		if(!name || name==''){
			Toast.info('请输入联系人称呼')
			return
		}
		if(!phone || phone=='' || hasError){
			Toast.info('请输入11位联系人手机');
			return
		}
		
		const destination = window.sessionStorage.getItem('address_page_return')
		this.props.dispatch({
			type: 'address/saveDelivery', 
			payload: {delivery,destination}
		})
	}

	onBackClick = () => {
		const destination = window.sessionStorage.getItem('address_page_return')
		this.props.dispatch(routerRedux.push(destination))
	}

	render(){
		const {dispatch, form, user, showModal} = this.props
		if(!user || !user.id)
			return null

		const { getFieldProps } = form

		const {name, address, city, location, lat, lng, phone} = this.state.delivery
	  	return (
		<div className={styles.container}>
			<Helmet>
	            <title>设置收货信息</title>
	        </Helmet>
	        
            <ModalDialog visible={showModal} onWarnClose={this.onWarnClose} />

		    <NavBar
		        leftContent="返回"
		        mode="light"
		        onLeftClick={this.onBackClick}
		    >
		    	配送收货信息
		    </NavBar>
		    <div>
			    <List renderHeader={() => '详细收货地址'}>
				    <Item
			          thumb={<Icon type="#icon-ditu" />}
			          arrow="horizontal"
			          onClick={this.onMapClick}>
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
		            onChange={this.onAddressChange}
		            rows={5}
		            count={100}
		          />
		        </List>
		        <WhiteSpace />
		        <List renderHeader={() => '联系人如何称呼'}>
		          <InputItem
		            placeholder="张先生、王女士"
		            focused={this.state.focusedName}
					{...getFieldProps('name')}
		            clear
		            onFocus={() => {
		              this.setState({
		              	...this.state,
		            	focusedName: false,
		              });
		            }}
					onChange={this.onNameChange}
		            value = {name}
		          ><div onClick={() => this.setState({ ...this.state, focusedName: true })}>联系人</div></InputItem>
		        </List>
		        <List renderHeader={() => '收货人联系方式'}>
					<InputItem
					type="phone"
					{...getFieldProps('phone')}
					clear
					placeholder="输入11位电话号码"
					error={this.state.hasError}
					onErrorClick={this.onErrorClick}
					onChange={this.onPhoneChange}
					value={phone}>
						手机号码
					</InputItem>
				</List>
				<WhiteSpace size="lg"/>
				<WingBlank>
					<Button type="primary" onClick={this.onSubmit}>保存配送信息</Button>
				</WingBlank>
		    </div>
		</div>
	  	);
	}
}

AddressPage.propTypes = {
};

const mapStateToProps = (state) => ({
	showModal: state.address.showModal,
	user: state.user,
    delivery:state.user.delivery,
});

const AddressPageWrapper = createForm()(AddressPage);

export default connect(mapStateToProps)(AddressPageWrapper);
