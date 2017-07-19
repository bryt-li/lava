import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

import PropTypes from 'prop-types'
import { Modal, Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile'
import ReactLoading from 'react-loading'

import styles from './index.less'

const ModalDialog = ({visible, onClose}) => {
	return(
		<Modal
			title="空空如也"
			transparent
			maskClosable={false}
			visible={visible}
			onClose={onClose()}
			footer={[{ text: '确定', onPress: () => { onClose()(); } }]}
			>
			购物车是空的。<br />
			快饿死了......<br />
		</Modal>
	)
}

class ShopCart extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      showModal: false,
	    };
	}

	showModal = () => (e) => {
		// 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
	    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
		if(e)
		    e.preventDefault();

	    this.setState({
		    showModal: true,
	    });
	}

	onClose = () => () => {
	    this.setState({
	      showModal: false,
	    });
  	}

  	handlePlusClicked = () => {
  		const {dispatch, type, id} = this.props
		dispatch({ type: 'cart/plus',payload: {type:type, id:id} })
  	}

  	handleMinusClicked = () => {
  		const {dispatch, type, id} = this.props
  		dispatch({ type: 'cart/minus',payload: {type:type, id:id} })
  	}


  	nothing_in_cart = () => {
		for(var t in this.props.items)
			for(var i in this.props.items[t])
				if(this.props.items[t][i]>0)
					return false
		return true
	}

  	handleCheckoutClicked = () => {
  		if(this.nothing_in_cart())
  			this.showModal()()
  		else
	  		this.props.dispatch(routerRedux.push('/order/confirm'));
  	}


  	render(){
  		const {showAdd,type,id, dispatch, items, total, saving} = this.props

		if(showAdd){
			const quantity = items[type][id];

			return(
			<div className={styles.cart}>
				<ModalDialog visible={this.state.showModal}	onClose={this.onClose} />

				<div className={styles.left}>
					{quantity>0?
						<div>
							<div className={styles.minus}><Icon type="#icon-jian"  onClick={this.handleMinusClicked}/></div>
						 	<div className={styles.quantity}>{quantity}</div>
						 	<div className={styles.plus}><Icon type="#icon-tianjia"  onClick={this.handlePlusClicked}/></div>
						</div>
						:
						<span className={styles.add_to_cart} onClick={this.handlePlusClicked}>加入购物车</span>
					}

				</div>
				<div className={styles.middle}>
					<Button className={styles.checkout_btn} 
						inline
						icon="#icon-cart"
						size = "large"
						onClick={this.handleCheckoutClicked}
					/>
					<div className={styles.rect_info_bar}>
						<span className={styles.cny}>￥</span>
						<span className={styles.total_money}>{total.toFixed(1)}</span>
						<span className={styles.delivery_saving_fee}>{saving>0?`优惠${saving.toFixed(1)}元`:(total>38?'免费配送':'满38免配送费')}</span>
					</div>
				</div>
				<div className={styles.right}></div>
			</div>
			);
		}
		else return(
			<div className={styles.cart}>
				<ModalDialog visible={this.state.showModal}	onClose={this.onClose} />

				<Button className={styles.checkout_btn} 
					inline
					icon="#icon-cart"
					size = "large"
					onClick={this.handleCheckoutClicked}
				/>
				<div className={styles.round_info_bar}>
					<span className={styles.cny}>￥</span>
					<span className={styles.total_money}>{total.toFixed(1)}</span>
					<span className={styles.delivery_saving_fee}>{saving>0?`优惠${saving.toFixed(1)}元`:(total>38?'免费配送':'满38免配送费')}</span>
				</div>
			</div>
		);
	}
}


ShopCart.propTypes = {
	showAdd: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	items: state.cart.items,
	total: state.cart.total,
	saving: state.cart.saving
});

export default connect(mapStateToProps)(ShopCart);
