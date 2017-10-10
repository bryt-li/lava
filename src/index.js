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

app.model(require('./routes/LayoutUser/controller'))
app.model(require('./routes/LayoutShop/controller'))

app.model(require('./routes/HomePage/controller'))
app.model(require('./routes/ItemPage/controller'))

app.model(require('./routes/UserHomePage/controller'))
app.model(require('./routes/AddressPage/controller'))
app.model(require('./routes/CartPage/controller'))
app.model(require('./routes/OrderListPage/controller'))
app.model(require('./routes/OrderShowPage/controller'))
app.model(require('./routes/OrderEditPage/controller'))
app.model(require('./routes/WechatPayPage/controller'))

app.model(require('./routes/AdminHomePage/controller'))
app.model(require('./routes/AdminOrderListPage/controller'))
app.model(require('./routes/AdminOrderShowPage/controller'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')

