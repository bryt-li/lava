//const BACKEND = 'https://m.huolihuoshan.com/hlhs-backend'
const BACKEND = 'http://0.0.0.0:9090/hlhs-backend'
//const FRONTEND = 'https://m.huolihuoshan.com'
const FRONTEND = 'http://0.0.0.0:8080'

const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const WECHAT_APP_ID='wxe6113ca48260dbd9'
const WECHAT_LOGIN_REDIRECT_URL=`${BACKEND}/user/wxlogin`
const WECHAT_LOGIN_SCOPE='snsapi_userinfo'

const MAP_KEY = 'FE4BZ-LJXW4-IWBUR-DXK2T-TYC7K-WTBGD'
const MAP_BACK_URL = `http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${MAP_KEY}&referer=hlhs`

module.exports = {
  name: '活力火山健康商城',
  prefix: '',
  footerText: '活力火山 © 2017 HLHS',
  logo: '/logo.png',
  logoBig: '/logoBig.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/','/signin','/signup','/item'],

//  wechatLoginUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WECHAT_APP_ID}&redirect_uri=${WECHAT_LOGIN_REDIRECT_URL}&response_type=code&scope=${WECHAT_LOGIN_SCOPE}&state=STATE#wechat_redirect`,
  wechatLoginUrl: `http://0.0.0.0:9090/hlhs-backend/wechat_login_mock/authorize?appid=${WECHAT_APP_ID}&redirect_uri=${WECHAT_LOGIN_REDIRECT_URL}&response_type=code&scope=${WECHAT_LOGIN_SCOPE}&state=STATE#wechat_redirect`,

  mapUrl: `http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${MAP_KEY}&referer=hlhs`,
  api: {
    getMe: `${BACKEND}/user/me`,
    getDelivery: `${BACKEND}/user/delivery`,
    saveDelivery: `${BACKEND}/user/delivery/save`,
    logout: `${BACKEND}/user/logout`,
    createOrder: `${BACKEND}/order/create`,
    
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    salad: '/menu/salad',
    salad_ingredient: '/menu/salad_ingredient',
    sauce: '/menu/sauce',
    sauce_ingredient: '/menu/souce_ingredient',
  },
}
