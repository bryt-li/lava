import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';


import styles from './index.less';

const HOME = require('../../../menu/home.js');
const HOME_STAPLES = HOME.staples;
const HOME_YOGURTS = HOME.yogurts;
const HOME_JUICES = HOME.juices;

const MENU = require('../../../menu');
const STAPLES = MENU.staples;
const SEASONINGS = MENU.seasonings;
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

const Item = ({type,id,name,slogon,original_price,price}) => {
	return(
		<div className={styles.item}>
			<Link to={`/i/${type}/${id}`}>
				<img src={`/menu/${type}/${id}/home.jpg`} />
			</Link>
			<h2>{name}</h2>
			<h3>{slogon}</h3>
			<h4>{original_price}-{price}</h4>
		</div>
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
	  		<Flex wrap="wrap">
	  			{HOME_STAPLES.map((id,key) => {
	  				let item = STAPLES[id];
	  				return (
	  					<Item key={key} type='staples' id={id} 
	  						name={item.name} slogon={item.slogon} 
	  						original_price={item.original_price}
	  						price={item.price} />
	  				);
	  			})}
		  	</Flex>
		  	<hr />
		    <h1><span>酸奶沙拉</span></h1>
		  	<ul>
		  		<li><Link to="/i/staples/swybsm">三文鱼菠色面</Link></li>
		  		<li><Link to="/i/staples/sbhmkj">桑巴红米烤鸡</Link></li>
	  		</ul>
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
