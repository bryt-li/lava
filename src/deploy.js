//本地部署
const HLHS_FRONTEND = 'http://0.0.0.0:8080'
const HLHS_BACKEND = 'http://192.168.1.88:9090/hlhs-backend'
const WECHAT_BACKEND = `${HLHS_BACKEND}/wechat_login_mock`

//服务器部署
/*
const HLHS_FRONTEND = 'https://m.huolihuoshan.com'
const HLHS_BACKEND = 'https://m.huolihuoshan.com/hlhs-backend'
const WECHAT_BACKEND = 'https://open.weixin.qq.com/connect/oauth2'
*/

module.exports = {
	HLHS_BACKEND,
	WECHAT_BACKEND,
	HLHS_FRONTEND,
}
