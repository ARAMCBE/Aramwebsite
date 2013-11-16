var login = function() {
	var emailId = $('#email').val();
	var password = $('#password').val();
	$.post('/login', {email:emailId, password:password}, function (data){
		alert(data);
	});
}