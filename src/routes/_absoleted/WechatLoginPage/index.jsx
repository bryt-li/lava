import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";

const config =  require('../../config');

const WechatLoginPage = ({location}) => {
	let redirect = location.hash;
	redirect = redirect.replace('#','').replace(/\//g,'777');
    let url = config.api.wechatLogin.replace('CALLER_URL',redirect);

	return (
		<Helmet>
            <meta charSet="utf-8" />
            <title>微信登录</title>
            <meta http-equiv="refresh" content={`0; url=${url}`} />
        </Helmet>
	);
}

WechatLoginPage.propTypes = {
	dispatch: PropTypes.func,
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user:state.user,
});

export default connect(mapStateToProps)(WechatLoginPage);
