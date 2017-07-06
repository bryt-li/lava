
import { routerRedux } from 'dva/router';

export default {

  namespace: 'app',

  state: {
    user: null
  },

  subscriptions: {
    /* check user login*/
    accessControl({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: 'checkLogin', payload: {pathname}});
      });
    },

    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *checkLogin({payload}, { select, put }){
      
      //Notice: selecting state with namespace, IMPORTANT!!!
      const user = yield select(state => state.app.user);
      const {pathname} = payload;

      //console.log(`check login - path: ${pathname} user: ${user}`);

      if(pathname == "/signin" && user){
        yield put(routerRedux.replace('/user'));
        return;
      }
      const loginRequired = pathname.indexOf('/user') == 0;
      if (loginRequired && user==null) {
          yield put(routerRedux.push('/signin'));
          return;
      }
    },

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
