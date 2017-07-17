import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Helmet} from "react-helmet";

const WechatLoginPage = () => {
	return (
		<Helmet>
            <meta charSet="utf-8" />
            <title>正在进行微信登录</title>
            <meta http-equiv="refresh" content="0; url=https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe6113ca48260dbd9&redirect_uri=https%3A%2F%2Fm.huolihuoshan.com%2Fhlhs-backend%2Fwechat%2Flogin&response_type=code&scope=snsapi_userinfo&state=null#wechat_redirect" />
        </Helmet>
	);
}

WechatLoginPage.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(WechatLoginPage);
