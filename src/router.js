import React from 'react';
import { Router, Route } from 'dva/router';

import IndexPage from './routes/IndexPage';
import SigninPage from './routes/SigninPage';
import SignupPage from './routes/SignupPage';
import UserPage from './routes/UserPage';
import AddressPage from './routes/AddressPage';


function RouterConfig({ history }) {
  	return (
    <Router history={history}>
    	<Route path="/" component={IndexPage} />
    	<Route path="/signin" component={SigninPage} />
    	<Route path="/signup" component={SignupPage} />

	    <Route path="/user" component={UserPage} />
	    <Route path="/user/address" component={AddressPage} />
    </Router>
 	);
}

export default RouterConfig;
