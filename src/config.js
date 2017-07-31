import {HLHS_BACKEND,HLHS_FRONTEND,WECHAT_BACKEND} from './deploy'

const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const WECHAT_APP_ID='wxe6113ca48260dbd9'
const WECHAT_LOGIN_REDIRECT_URL=`${HLHS_BACKEND}/user/wxlogin`
const WECHAT_LOGIN_SCOPE='snsapi_userinfo'

const MAP_KEY = 'FE4BZ-LJXW4-IWBUR-DXK2T-TYC7K-WTBGD'

module.exports = {
  name: '活力火山健康轻食',
  prefix: '',
  footerText: '活力火山微店 © 2017 HLHS',
  logo: '/logo.png',
  logoBig: '/logoBig.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/','/signin','/signup','/item'],

  wechatLoginUrl: `${WECHAT_BACKEND}/authorize?appid=${WECHAT_APP_ID}&redirect_uri=${WECHAT_LOGIN_REDIRECT_URL}&response_type=code&scope=${WECHAT_LOGIN_SCOPE}&state=DESTINATION#wechat_redirect`,
  mapUrl: `http://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${HLHS_FRONTEND}/address&key=${MAP_KEY}&referer=hlhs`,

  api: {
    getMe: `${HLHS_BACKEND}/user/me`,
    saveDelivery: `${HLHS_BACKEND}/user/delivery/save`,
    logout: `${HLHS_BACKEND}/user/logout`,
    createOrder: `${HLHS_BACKEND}/order/create`,
    getOrder: `${HLHS_BACKEND}/order/get`,
    getOrderList: `${HLHS_BACKEND}/order/list`,
    wechatPay:  `${HLHS_BACKEND}/order/pay/wechat`,

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
