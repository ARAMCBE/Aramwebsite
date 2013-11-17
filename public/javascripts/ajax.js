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
	jsonObj.country = "India";
	jsonObj.state = "Tamil nadu";
	jsonObj.city = "Cooimbatore";
	jsonObj.address = "11/45, Peelamedu";
	jsonObj.firstname = $('#id_aramRegFirstName').val();
	jsonObj.lastname = $('#id_aramRegLastName').val();
	jsonObj.gender = $('#id_aramRegGender').val();
	jsonObj.pincode = $('#id_aramRegPin').val();
	$.post('/registration', jsonObj, function (data){
		console.log(data);
	});
};

var registrationPost = function(){
	var jsonObj = {};
	jsonObj.mailId = "testMail@test.com";
    jsonObj.password = "password";
    jsonObj.repassword = "password";
    jsonObj.mobile = "3254658585";
    jsonObj.dob = "17/11/2013";
	jsonObj.country = "India";
	jsonObj.state = "Tamil nadu";
	jsonObj.city = "Coimbatore";
	jsonObj.address = "45/11";
	jsonObj.firstname = "Anbu";
	jsonObj.lastname = "S";
	jsonObj.gender = "Male";
	jsonObj.pincode = "641004";
	$.post('/registration', jsonObj, function (data){
		console.log(data);
	});
};


