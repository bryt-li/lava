const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

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
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    salad: '/menu/salad',
    salad_ingredient: '/menu/salad_ingredient',
    sauce: '/menu/sauce',
    sauce_ingredient: '/menu/souce_ingredient',
  },
}
