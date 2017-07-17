//const BACKEND = 'https://m.huolihuoshan.com/hlhs-backend'
const BACKEND = 'http://192.168.1.232:9090/hlhs-backend'

const APIV1 = '/api/v1'
const APIV2 = '/api/v2'


const APP_ID = 'wxe6113ca48260dbd9'
const LOGIN_URL = encodeURI('https://m.huolihuoshan.com/hlhs-backend/wechat/login')
const LOGIN_SCOPE = 'snsapi_userinfo'

module.exports = {
  name: '活力火山健康商城',
  prefix: '',
  footerText: '活力火山 © 2017 HLHS',
  logo: '/logo.png',
  logoBig: '/logoBig.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/','/signin','/signup','/item'],
  api: {
    wechatLogin: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${LOGIN_URL}&response_type=code&scope=${LOGIN_SCOPE}&state=CALLER_URL#wechat_redirect`,
    user: `${BACKEND}/wechat/user`,

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
