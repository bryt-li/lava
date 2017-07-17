import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";

const WechatLoginSucceedPage = ({dispatch, location, user}) => {
	let redirect = location.hash;
	redirect = redirect.replace('#','');
	
	dispatch({ type: 'user/queryUser' });

	if(!user.openid){
		redirect = location.pathname+location.hash;
	}

	return (
		<Helmet>
            <meta charSet="utf-8" />
            <title>微信登录成功</title>
            <meta http-equiv="refresh" content={`0; url=${redirect}`} />
        </Helmet>
	);
}

WechatLoginSucceedPage.propTypes = {
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(WechatLoginSucceedPage);
