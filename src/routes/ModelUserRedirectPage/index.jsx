import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class ModelUserRedirectPage extends React.Component {
	constructor (props) {
    	super(props)
    	const {dispatch} = props
    	const {clear, redirect} = props.location.query
    	if(clear){
			dispatch({ type: 'signedOut'});
            dispatch(routerRedux.replace(redirect))    	
        }else{
            let user = {...props.location.query}
            delete user.redirect
            dispatch({ type: 'signedIn', payload:user});
            dispatch(routerRedux.replace(redirect))
        }
	}

	render(props){
		return null
	}
}

export default connect()(ModelUserRedirectPage);
