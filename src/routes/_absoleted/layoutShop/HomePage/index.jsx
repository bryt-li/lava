import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import { Carousel, WingBlank, Flex, Button, Icon } from 'antd-mobile';
import ReactLoading from 'react-loading';

const ShopItem = require('../../../components/ShopItem/');
const HomeCart = require('../../../components/HomeCart/');

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
		const {salads, yogurts, juices, rices, menu} = this.props;

	  	return (
	  	<div className={styles.container}>

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
	  		<HomeCart />
		</div>
		);
	}
}

HomePage.propTypes = {
	dispatch: PropTypes.func,
	salads: PropTypes.array,
	yogurts: PropTypes.array,
	juices: PropTypes.array,
	rices: PropTypes.array,
	menu: PropTypes.object,
};

const mapStateToProps = (state) => ({
    salads: state.home.salads,
    yogurts: state.home.yogurts,
    juices: state.home.juices,
    rices: state.home.rices,
    menu: state.app.menu,
});

export default connect(mapStateToProps)(HomePage);
