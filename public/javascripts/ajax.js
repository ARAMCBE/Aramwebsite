
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
			alert(JSON.stringify(jsonData));
		}else{
			alert($.resultCodes[jsonData.code]);
		}
	});
}

var registrationPost = function(jsonObj){
	$.post('/registration', jsonObj, registration.afterRegistrationPost);
};
