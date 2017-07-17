import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';

import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';

import styles from './index.less';

const ShopCart = ({showAdd,type,id, dispatch, items, total, saving}) => {

  	const handlePlusClicked = () => {
		dispatch({ type: 'cart/plus',payload: {type:type, id:id} });
  	}

  	const handleMinusClicked = () => {
  		dispatch({ type: 'cart/minus',payload: {type:type, id:id} });
  	}

  	const handleCheckoutClicked = () => {
  		//dispatch({type:'cart/checkout',payload:null});
  		dispatch(routerRedux.push('/order/confirm'));
  	}

	if(showAdd){
		const quantity = items[type][id];

		return(
		<div className={styles.cart}>
			<div className={styles.left}>
				{quantity>0?
					<div className={styles.buy}>
						<div className={styles.minus}><Icon type="#icon-jian"  onClick={handleMinusClicked}/></div>
					 	<div className={styles.quantity}>{quantity}</div>
					 	<div className={styles.plus}><Icon type="#icon-tianjia"  onClick={handlePlusClicked}/></div>
					</div>
					:
					<span onClick={handlePlusClicked}>加入购物车</span>
				}

			</div>
			<div className={styles.middle}>
				<Button className={styles.checkout_btn} 
					inline
					icon="#icon-cart"
					size = "large"
					onClick={handleCheckoutClicked}
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
				<Button className={styles.checkout_btn} 
					inline
					icon="#icon-cart"
					size = "large"
					onClick={handleCheckoutClicked}
				/>
				<div className={styles.round_info_bar}>
					<span className={styles.cny}>￥</span>
					<span className={styles.total_money}>{total.toFixed(1)}</span>
					<span className={styles.delivery_saving_fee}>{saving>0?`优惠${saving.toFixed(1)}元`:(total>38?'免费配送':'满38免配送费')}</span>
				</div>
		</div>
	);
}


ShopCart.propTypes = {
	showAdd: PropTypes.bool,
	dispatch: PropTypes.func,
	items: PropTypes.object,
	total: PropTypes.number,
	saving: PropTypes.number
};

const mapStateToProps = (state) => ({
	items: state.cart.items,
	total: state.cart.total,
	saving: state.cart.saving
});

export default connect(mapStateToProps)(ShopCart);
