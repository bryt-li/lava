import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';
import classNames from 'classnames';

import styles from './index.less';

class ShopItem extends React.Component {
	constructor (props) {
    	super(props)
	    this.state = {
		    imageLoading: true,
	    }
	}

  	handleImageLoaded = () => {
  		this.setState({...this.state, imageLoading:false});
  	}

  	handlePlusClicked = () => {
  		const {dispatch, type, id} = this.props;
		dispatch({ type: 'cart/plus',payload: {type:type, id:id} });
  	}

  	handleMinusClicked = () => {
  		const {dispatch, type, id} = this.props;
  		dispatch({ type: 'cart/minus',payload: {type:type, id:id} });
  	}
	
	render(){
		const { type, id, dispatch, items, menu } = this.props;
		const { imageLoading} = this.state;

		if(!id) return(
			<Flex.Item className={styles.item_blank}>
			</Flex.Item>
		);

		const item = menu[type][id];
		const quantity = items[type][id];

		return(
		<Flex.Item className={classNames({[styles.item]:true, [styles.item_selected]:quantity>0})}>
			<Link to={`/i/${type}/${id}`}>
				{imageLoading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
				<img onLoad={this.handleImageLoaded} src={`/menu/${type}/${id}/home.jpg`} />
			</Link>
			<h2>{item.name}</h2>
			<h3>{item.slogon}</h3>
			<div>
				<div className={styles.price}>￥{item.price}<span>￥{item.original_price}&nbsp;</span></div>
				{quantity>0?
					(
					<div className={styles.buy}>
						<div className={styles.minus}><Icon type="#icon-jian"  onClick={this.handleMinusClicked}/></div>
					 	<div className={styles.quantity}>{quantity}</div>
					 	<div className={styles.plus}><Icon type="#icon-tianjia"  onClick={this.handlePlusClicked}/></div>
				 	</div>
					)
					:
					(
					<div className={styles.buy}>
						<span className={styles.plus}><Icon type="#icon-tianjia" onClick={this.handlePlusClicked}/></span>
				 	</div>
					)
				}
			</div>
		</Flex.Item>
		);
	}
}

ShopItem.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	dispatch: PropTypes.func,
	items: PropTypes.object,
	menu: PropTypes.object
};

const mapStateToProps = (state) => ({
    menu: state.app.menu,
    items: state.cart.items
});

export default connect(mapStateToProps)(ShopItem);
