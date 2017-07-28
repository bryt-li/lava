window.addEventListener('message', 
	function(event) {
		var sender = event.data.sender;
	    var message = event.data.message;
	    
	    if(sender != 'hlhs-backend')
	    	return;
		console.log(event.data);

	    if (message == 'ok') {
			window.onSignedIn();
	    }else{
	    	window.onSignInFailed();
	    }
	}, 
	false
);
