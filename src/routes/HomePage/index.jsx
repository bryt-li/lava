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

function HomePage({ children, dispatch, location, home, ui, user }) {

	const handleImageLoaded = ()=>{
		dispatch({type:'HomePage/updateUI',payload:{imageLoading:false}})
	}
	
	const { salads, yogurts, rices, juices, tests } = home
	const { imageLoading } = ui

	return (
  	<div className={styles.container}>
		<Helmet>
            <meta charSet="utf-8" />
            <title>活力火山微商城</title>
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
			<img onLoad={handleImageLoaded} alt="icon" src={`/home/4.jpg`} />
	    </Carousel>


	    <h1><span>主食沙拉</span></h1>
  		<WingBlank size="sm">
  			{salads.map((id,key) => {
  				let prevId=null;
  				let output = false;

  				if(key%2==1){
  					prevId = salads[key-1];
  					output = true;
  				}else if(key==salads.length-1){
  					prevId = id;
  					id=null;
  					output = true;
  				}

	  			if (output)	return (  				
  					<Flex key={key}>
	  					<ShopItem type="salads" id={prevId} />
	  					<ShopItem type="salads" id={id} />
	  				</Flex>
  				);
  			})}
	  	</WingBlank>
	  	<hr />

	    <h1><span>美味饭团子</span></h1>
	  	<hr />

	    <h1><span>酸奶沙拉</span></h1>
	  	
	  	<hr />

	    <h1><span>轻断食-果蔬稀</span></h1>
	  	
	  	<hr />

	  	{(user && (user.nickname=='李昕'||user.nickname=='HLHS'))?
	  	<div>
		  	<h1><span>内部测试</span></h1>
	  		<WingBlank size="sm">
	  			{tests.map((id,key) => {
	  				let prevId=null;
	  				let output = false;

	  				if(key%2==1){
	  					prevId = tests[key-1];
	  					output = true;
	  				}else if(key==tests.length-1){
	  					prevId = id;
	  					id=null;
	  					output = true;
	  				}

		  			if (output)	return (  				
	  					<Flex key={key}>
		  					<ShopItem type="tests" id={prevId} />
		  					<ShopItem type="tests" id={id} />
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

HomePage.propTypes = {
};

const mapStateToProps = (state) => ({
    home: state.app.home,
    ui: state.HomePage.ui,
    user: state.user,
});

export default connect(mapStateToProps)(HomePage);
