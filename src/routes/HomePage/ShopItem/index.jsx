import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';
import classNames from 'classnames';

import {formatMoney} from '../../../utils/price'

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
  		const {dispatch, item} = this.props;
		dispatch({ type: 'menu/changeMenuItemQuantity',payload: {item, inc:1} });
  	}

  	handleMinusClicked = () => {
  		const {dispatch, item} = this.props;
  		dispatch({ type: 'menu/changeMenuItemQuantity',payload: {item, inc:-1} });
  	}
	
	render(){
		const { item, dispatch, catalog } = this.props;
		const { imageLoading} = this.state;

		if(!item) return(
			<Flex.Item className={styles.item_blank}>
			</Flex.Item>
		)

		const {type,id,quantity}= item;
		
		return(
		<Flex.Item className={classNames({[styles.item]:true, [styles.item_selected]:quantity>0})}>
			<Link to={`/shop/item/${type}/${id}`}>
				{imageLoading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
				<img onLoad={this.handleImageLoaded} src={`/menu/${type}/${id}/home.jpg`} />
			</Link>
			<h2>{item.name}</h2>
			<h3>{item.slogon}</h3>
			<div>
				<div className={styles.price}>￥{formatMoney(item.price)}<span>￥{formatMoney(item.original_price)}&nbsp;</span></div>
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
	item: PropTypes.object,
};

const mapStateToProps = (state) => ({
    catalog: state.menu.catalog,
});

export default connect(mapStateToProps)(ShopItem);
