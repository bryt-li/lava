import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import {Helmet} from "react-helmet";
import ReactLoading from 'react-loading';

const Header = require('./Header/');
const ShopItem = require('./ShopItem/');

import styles from './index.less';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {location,dispatch} = this.props
		dispatch({type:'HomePage/componentWillMount',payload:location.query})
		dispatch({type:'LayoutShop/clearItem'})
	}

	handleImageLoaded = ()=>{
		this.props.dispatch({type:'HomePage/updateUI',payload:{imageLoading:false}})
	}
	
	render(){

		const { children, dispatch, location, catalog, ui, user } = this.props

		const salads = Object.keys(catalog.salads).map(function(key) {
			return catalog.salads[key]
		});
		const yogurts = Object.keys(catalog.yogurts).map(function(key) {
			return catalog.yogurts[key]
		});
		const rices = Object.keys(catalog.rices).map(function(key) {
			return catalog.rices[key]
		});
		const juices = Object.keys(catalog.juices).map(function(key) {
			return catalog.juices[key]
		});
		const tests = Object.keys(catalog.tests).map(function(key) {
			return catalog.tests[key]
		});

		const { imageLoading, title } = ui

		return (
	  	<div className={styles.container}>
			<Helmet>
	            <meta charSet="utf-8" />
	            <title>{title}</title>
	        </Helmet>

	  	    <Header location={location}/>

			{imageLoading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
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
	  			{salads.map((v,i) => {

	  				let prev=null
	  				let cur=v
	  				let output = false

	  				if(i%2==1){
	  					prev = salads[i-1];
	  					output = true;
	  				}else if(i==salads.length-1){
	  					prev = v;
	  					cur=null;
	  					output = true;
	  				}

		  			if (output)	return (  				
	  					<Flex key={i}>
		  					<ShopItem item={prev} />
		  					<ShopItem item={cur} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>

		    <h1><span>美味饭团子</span></h1>
			<WingBlank size="sm">
	  			{rices.map((v,i) => {

	  				let prev=null
	  				let cur=v
	  				let output = false

	  				if(i%2==1){
	  					prev = rices[i-1];
	  					output = true;
	  				}else if(i==rices.length-1){
	  					prev = v;
	  					cur=null;
	  					output = true;
	  				}

		  			if (output)	return (  				
	  					<Flex key={i}>
		  					<ShopItem item={prev} />
		  					<ShopItem item={cur} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>

		    <h1><span>酸奶沙拉</span></h1>
		  	<WingBlank size="sm">
	  			{yogurts.map((v,i) => {

	  				let prev=null
	  				let cur=v
	  				let output = false

	  				if(i%2==1){
	  					prev = yogurts[i-1];
	  					output = true;
	  				}else if(i==yogurts.length-1){
	  					prev = v;
	  					cur=null;
	  					output = true;
	  				}

		  			if (output)	return (  				
	  					<Flex key={i}>
		  					<ShopItem item={prev} />
		  					<ShopItem item={cur} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>

		    <h1><span>轻断食-果蔬稀</span></h1>
		  	<WingBlank size="sm">
	  			{juices.map((v,i) => {

	  				let prev=null
	  				let cur=v
	  				let output = false

	  				if(i%2==1){
	  					prev = juices[i-1];
	  					output = true;
	  				}else if(i==juices.length-1){
	  					prev = v;
	  					cur=null;
	  					output = true;
	  				}

		  			if (output)	return (  				
	  					<Flex key={i}>
		  					<ShopItem item={prev} />
		  					<ShopItem item={cur} />
		  				</Flex>
	  				);
	  			})}
		  	</WingBlank>
		  	<hr />

		  	{(user && (user.nickname=='李昕'||user.nickname=='HLHS'))?
		  	<div>
			  	<h1><span>内部测试</span></h1>
		  		<WingBlank size="sm">
		  			{tests.map((v,i) => {

		  				let prev=null
		  				let cur=v
		  				let output = false

		  				if(i%2==1){
		  					prev = tests[i-1];
		  					output = true;
		  				}else if(i==tests.length-1){
		  					prev = v;
		  					cur=null;
		  					output = true;
		  				}

			  			if (output)	return (  				
		  					<Flex key={i}>
			  					<ShopItem item={prev} />
			  					<ShopItem item={cur} />
			  				</Flex>
		  				);
		  			})}
			  	</WingBlank>
			  	<hr />
		  	</div>
		  	:null
		  	}

		  	<div style={{display:'block',height:'500px'}} />
		</div>
		)
	}
}

HomePage.propTypes = {
};

const mapStateToProps = (state) => ({
    catalog: state.menu.catalog,
    ui: state.HomePage.ui,
    user: state.user,
});

export default connect(mapStateToProps)(HomePage);
