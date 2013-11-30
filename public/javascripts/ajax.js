
$.resultCodes = {
	1: "Mail already exists",
	2: "Error in registration0",
	3: "Already logged in",
	4: "Invalid username or password",
	5: "Successfully Registered"
};


var login = function() {
	var emailId = $('#email').val();
	var password = $('#password').val();
	$.post('/login', {email:emailId, password:password}, function (data){
		var jsonData = JSON.parse(data);
		if(jsonData.success){
			$("#login-error").css("visibility", "hidden");
			window.location.reload(true);
		}else{
			$("#login-error").css("visibility", "visible");
			$("#email").select();
		}
	});
}

var logout = function(){
	$.post('/logout', {}, function(data){
		var jsonData = JSON.parse(data);
		if(jsonData.success){
			window.location.reload(true);	
			$("#user_name").text("");
		}
	});
}

var registrationPost = function(jsonObj){
	$.post('/registration', jsonObj, registration.afterRegistrationPost);
};
