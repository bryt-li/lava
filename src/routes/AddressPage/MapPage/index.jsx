import React from 'react';
import { connect } from 'dva';
import { Modal, Flex, Carousel, WhiteSpace, WingBlank,
Button, Grid, Icon, NavBar, List, DatePicker, Picker, InputItem, Toast, TextareaItem } from 'antd-mobile';
import {Helmet} from "react-helmet";
import {  routerRedux } from 'dva/router'
import { createForm } from 'rc-form'

import styles from './index.less'

const config = require("../../../config.js")

const Item = List.Item

const ModalDialog = ({visible, onClose}) => {
  return(
    <Modal
      title=""
      transparent
      maskClosable={false}
      visible={visible}
      onClose={onClose()}
      footer={[{ text: '确定', onPress: () => { onClose()(); } }]}
      >
      <p>请选择离最近的知名地址</p>
    </Modal>
  )
}

class MapPage extends React.Component {
	constructor(props) {
		super(props)

		window.locationSelected = this.locationSelected

		this.state = {
			showModal: false,
    	}
	}

	locationSelected = (location) => {
		console.log(location)

		if(location.poiname == "我的位置" || 
			location.cityname == "" || location.cityname != "长沙市" ||
			location.poiaddress == "")
		{
			this.setState({
		        showModal: true,
		    })
		}else{
			const {dispatch} = this.props
			const payload = {
				city: location.cityname,
				location: location.poiname,
				address: `${location.cityname} ${location.poiaddress} ${location.poiname} `,
				lat: location.latlng.lat,
				lng: location.latlng.lng
			}

		    dispatch({type:'user/updateDelivery', payload})
		    dispatch(routerRedux.replace('/address'))
		}
	}

	onClose = () => (e) => {
		if(e)
        	e.preventDefault();
		
		this.setState({
			showModal: false,
		})

    }

	render(){
	  	return (
		<div className={styles.container}>
			<Helmet>
	            <meta charSet="utf-8" />
	            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	            <title>选取收货地址</title>
	            <script src='/res/map.js' type="text/javascript" />
	        </Helmet>

            <ModalDialog visible={this.state.showModal} onClose={this.onClose} />

		    <iframe id="mapPage" width="100%" height="100%" frameBorder="0" 
			    src={config.mapUrl}>
			</iframe> 
		</div>
	  	);
	}
}

MapPage.propTypes = {
};

const mapStateToProps = (state) => ({
});

export default connect()(MapPage);
