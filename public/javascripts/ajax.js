
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

var registrationPost = function(){
	var jsonObj = {};
	jsonObj.mailId = $('#id_aramRegEmail').val();
    jsonObj.password = $('#id_aramRegPass').val();
    jsonObj.repassword = $('#id_aramRegRePass').val();
    jsonObj.mobile = $('#id_aramRegPhone').val();
    jsonObj.dob = $('#id_aramRegDate').val();
	jsonObj.country = $('#id_aramRegCountry').val();
	jsonObj.state = $('#id_aramRegState').val();
	jsonObj.city = $('#id_aramRegCity').val();
	jsonObj.address = $('#id_aramRegAddrs').val();
	jsonObj.firstname = $('#id_aramRegFirstName').val();
	jsonObj.lastname = $('#id_aramRegLastName').val();
	jsonObj.gender = $('#id_aramRegGender').val();
	jsonObj.pincode = $('#id_aramRegPin').val();
	if(jsonObj.repassword == jsonObj.password)
	{
		console.log(jsonObj);
		$.post('/registration', jsonObj, afterRegistrationPost);
	}
	else
	{
		alert('TODO : password dint match');
	}
};

var afterRegistrationPost = function(data){
	var jsonData = JSON.parse(data);
	alert($.resultCodes[jsonData.code]);
};

