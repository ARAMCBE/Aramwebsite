var login = function() {
	var emailId = $('#email').val();
	var password = $('#password').val();
	$.post('/login', {email:emailId, password:password}, function (data){
		alert(data);
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
		//$.post('/registration', jsonObj, afterRegistrationPost(data));
	}
	else
	{
		alert('TODO : password dint match');
	}
};

var afterRegistrationPost = function(data){
	console.log(data);
};


