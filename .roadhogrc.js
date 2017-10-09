import pxtorem from 'postcss-pxtorem';

const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  //path.resolve(__dirname, 'src/svg'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: "src/index.js",
  multipage: false,//note this
  disableCSSModules: false,
  publicPath: '/',
  theme: "./src/theme.js",
  resolve: {
    "extensions": [
      "",
      ".js",
      ".jsx"
    ]
  },
  autoprefixer: {
    browsers: [
      'iOS >= 8',
      'Android >= 4'
    ]
  },
  svgSpriteLoaderDirs: svgSpriteDirs,
  extraPostCSSPlugins:[
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    })
  ],
  extraBabelPlugins: [
    "transform-runtime",
    ["import", {
      "libraryName": "antd-mobile",
      "style": true
    }]
  ],
  env: {
    development: {
      "extraBabelPlugins": [
        "dva-hmr",
      ]
    },
    production: {
      "extraBabelPlugins": [
      ]
    }
  }
}
