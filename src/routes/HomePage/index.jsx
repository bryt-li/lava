import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import {Helmet} from "react-helmet";
import ReactLoading from 'react-loading';

const config =  require('../../config');

const Header = require('../../components/Header/');
const ShopItem = require('../../components/ShopItem/');
const ShopCart = require('../../components/ShopCart/');

import styles from './index.less';

class HomePage extends React.Component {
	constructor (props) {
    	super(props)
	    this.state = {
		    imageLoading: true
	    }
	}

  	handleImageLoaded = () => {
  		this.setState({...this.state, imageLoading:false});
  	}
	
	render(){
		let {dispatch, location, home, app, user} = this.props;
		if(user.id!=null && location.query.logout){
			dispatch({type:'user/signOut'})
			return(<div/>)
		}
		const {salads, yogurts, rices, juices} = home;
		const {menu} = app;

	  	return (
	  	<div className={styles.container}>
  			<Helmet>
	            <meta charSet="utf-8" />
	            <title>活力火山微商城</title>
	        </Helmet>

	  	    <Header user_icon={user?user.headImageUrl:null} location={location} dispatch={dispatch} />

			{this.state.imageLoading && <ReactLoading className={styles.loading} type='spinningBubbles' color='$444'/> }
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

		  	<div style={{display:'block',height:'400px'}} />


	  		<ShopCart showAdd={false}/>
		</div>
		);
	}
}

HomePage.propTypes = {
	dispatch: PropTypes.func,
	home: PropTypes.object,
	app: PropTypes.object,
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    home: state.home,
    app:state.app,
    user:state.user,
});

export default connect(mapStateToProps)(HomePage);
