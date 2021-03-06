import {HLHS_BACKEND,HLHS_FRONTEND} from './deploy'


const WECHAT_APP_ID='wxe6113ca48260dbd9'
const WECHAT_LOGIN_REDIRECT_URL=`${HLHS_BACKEND}/user/wxlogin`
const WECHAT_LOGIN_SCOPE='snsapi_userinfo'

const MAP_KEY = 'FE4BZ-LJXW4-IWBUR-DXK2T-TYC7K-WTBGD'

module.exports = {
  name: '活力火山健康轻食',
  prefix: '',
  footerText: '活力火山微商城 © 2017 HLHS',
  rootUrl: `${HLHS_FRONTEND}/`,
  wechatLoginUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WECHAT_APP_ID}&redirect_uri=${WECHAT_LOGIN_REDIRECT_URL}&response_type=code&scope=${WECHAT_LOGIN_SCOPE}&state=DESTINATION#wechat_redirect`,
  mapUrl: `http://apis.map.qq.com/tools/locpicker?search=1&type=0&key=${MAP_KEY}&referer=hlhs&backurl=${HLHS_FRONTEND}/app/#/user/address`,
  admin: [ //后台人员openid列表
    '88888888', //开发测试号
    'oIdKexE5wohYzdMLL1FeQZOQFgXA', //李昕
  ],
  api: {
    getMe: `${HLHS_BACKEND}/user/me`,
    saveDelivery: `${HLHS_BACKEND}/user/delivery/save`,
    logout: `${HLHS_BACKEND}/user/logout`,
    createOrder: `${HLHS_BACKEND}/order/create`,
    getOrder: `${HLHS_BACKEND}/order/get`,
    getOrderList: `${HLHS_BACKEND}/order/list`,
    getWechatJsapiConfig: `${HLHS_BACKEND}/wechat/jsapi/cfg`,
    getWechatPayJsapiArgs: `${HLHS_BACKEND}/order/getWechatPayJsapiArgs`,
    getAdminOrderList: `${HLHS_BACKEND}/admin/order/list`,
    updateOrderStatus: `${HLHS_BACKEND}/admin/order/update/status`,
  },
}
