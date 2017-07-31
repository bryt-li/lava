window.addEventListener('message', 
	function(event) {
		var sender = event.data.sender;
	    var message = event.data.message;

//		console.log(event.data);
	    
	    if(sender != 'hlhs-backend')
	    	return;

		console.log(event.data);

	    if (message == 'err') {
	    	window.onSignInFailed();
	    }else{
			window.onSignedIn(message);
	    }
	}, 
	false
);
