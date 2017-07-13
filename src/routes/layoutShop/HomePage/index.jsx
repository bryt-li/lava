import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';

import styles from './index.less';

const HOME = require('../../../menu/home.js');
const HOME_SALADS = HOME.salads;
const HOME_JUICES = HOME.juices;
const HOME_RICES = HOME.rices;
const HOME_YOGURTS = HOME.yogurts;

const MENU = require('../../../menu');
const SALADS = MENU.salads;
const RICES = MENU.rices;
const YOGURTS = MENU.yogurts;
const JUICES = MENU.juices;

const Cart = () => {
	return(
		<div className={styles.cart}>
			<Button className={styles.checkout_btn} 
				inline
				icon="#icon-cart"
				size = "large"
			/>
			<div className={styles.info_bar}><span className={styles.cny}>￥</span><span className={styles.total_money}>0</span><span className={styles.delivery_fee}>满38免配送费</span></div>
		</div>
	);
}

const Item = ({type,id,item}) => {
	if(item)
		return(
		<Flex.Item className={styles.item}>
			<Link to={`/i/${type}/${id}`}>
				<img src={`/menu/${type}/${id}/index.jpg`} />
			</Link>
			<h2>{item.name}</h2>
			<h3>{item.slogon}</h3>
			<h4>￥{item.original_price}<span>￥{item.price}&nbsp;</span></h4>
		</Flex.Item>
		);
	else
		return(
		<Flex.Item className={styles.item_blank}>
		</Flex.Item>
		);
}

class HomePage extends React.Component {
	constructor (props) {
    	super(props)
	    this.state = {
		    loading: true,
	    }
	}
  	handleImageLoaded = () => {
  		this.setState({...this.state, loading:false});
  	}
	
	render(){
	  	return (
	  	<div className={styles.container}>
			{this.state.loading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
	  		<Carousel
		      className={styles.carousel}
		      autoplay={true}
		      infinite
		      selectedIndex={0}
		      swipeSpeed={35}>
				<img alt="icon" src={`/home/1.jpg`} />
				<img alt="icon" src={`/home/2.jpg`} />
				<img alt="icon" src={`/home/3.jpg`} />
				<img onLoad={this.handleImageLoaded} alt="icon" src={`/home/4.jpg`} />
		    </Carousel>
		    <h1><span>主食沙拉</span></h1>
	  		<WingBlank size="sm">
	  			{HOME_SALADS.map((id,key) => {
	  				let item=SALADS[id];
	  				let prevId=null;
	  				let prevItem=null;
	  				let output = false;

	  				if(key%2==1){
	  					prevId = HOME_SALADS[key-1];
	  					prevItem = SALADS[prevId];
	  					output = true;
	  				}else if(key==HOME_SALADS.length-1){
	  					prevId = id;
	  					prevItem = item;
	  					item=null;
	  					output = true;
	  				}

		  			if (output) return (
	  					<Flex key={key}>
		  					<Item type="salads" id={prevId} item={prevItem} />
		  					<Item type="salads" id={id} item={item} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>
		  	<hr />

		    <h1><span>美味饭团子</span></h1>
		  	<WingBlank size="sm">
	  			{HOME_RICES.map((id,key) => {
	  				let item=RICES[id];
	  				let prevId=null;
	  				let prevItem=null;
	  				let output = false;

	  				if(key%2==1){
	  					prevId = HOME_RICES[key-1];
	  					prevItem = RICES[prevId];
	  					output = true;
	  				}else if(key==HOME_RICES.length-1){
	  					prevId = id;
	  					prevItem = item;
	  					item=null;
	  					output = true;
	  				}

		  			if (output) return (
	  					<Flex key={key}>
		  					<Item type="rices" id={prevId} item={prevItem} />
		  					<Item type="rices" id={id} item={item} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>
		  	<hr />


		    <h1><span>酸奶沙拉</span></h1>
		  	<WingBlank size="sm">
	  			{HOME_YOGURTS.map((id,key) => {
	  				let item=YOGURTS[id];
	  				let prevId=null;
	  				let prevItem=null;
	  				let output = false;

	  				if(key%2==1){
	  					prevId = HOME_YOGURTS[key-1];
	  					prevItem = YOGURTS[prevId];
	  					output = true;
	  				}else if(key==HOME_YOGURTS.length-1){
	  					prevId = id;
	  					prevItem = item;
	  					item=null;
	  					output = true;
	  				}

		  			if (output) return (
	  					<Flex key={key}>
		  					<Item type="yogurts" id={prevId} item={prevItem} />
		  					<Item type="yogurts" id={id} item={item} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>
		  	<hr />

		    <h1><span>轻断食-果蔬稀</span></h1>
		  	<WingBlank size="sm">
	  			{HOME_JUICES.map((id,key) => {
	  				let item=JUICES[id];
	  				let prevId=null;
	  				let prevItem=null;
	  				let output = false;

	  				if(key%2==1){
	  					prevId = HOME_JUICES[key-1];
	  					prevItem = JUICES[prevId];
	  					output = true;
	  				}else if(key==HOME_JUICES.length-1){
	  					prevId = id;
	  					prevItem = item;
	  					item=null;
	  					output = true;
	  				}

		  			if (output) return (
	  					<Flex key={key}>
		  					<Item type="juices" id={prevId} item={prevItem} />
		  					<Item type="juices" id={id} item={item} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>
		  	<hr />

		  	<div style={{display:'block',height:'400px'}} />
	  		<Cart />
		</div>
		);
	}
}

HomePage.propTypes = {
	loading: PropTypes.bool,
	dispatch: PropTypes.func
};

export default connect()(HomePage);
