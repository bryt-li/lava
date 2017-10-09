import dva from 'dva';
import createLoading from 'dva-loading'
import { Toast } from 'antd-mobile';

import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError (error) {
    Toast.fail(error.message, 1)
  },
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'))
app.model(require('./models/menu'))
app.model(require('./models/user'))
app.model(require('./routes/HomePage/controller'))
app.model(require('./routes/ItemPage/controller'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')

