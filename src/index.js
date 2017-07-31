// https://segmentfault.com/q/1010000005596587
import 'babel-polyfill'

import dva from 'dva';
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { Toast } from 'antd-mobile';

import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    Toast.fail(error.message, 1);
  },
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

