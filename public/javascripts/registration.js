var registration = {};
$('#id_aramPageTitle').html('Create your ARAM Account');
new (function(registrationObj){
	registrationObj.validation = function(){
		var thisObj = this;
	    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    var nameFilter = /^([a-zA-Z0-9 ])+$/;
	    var mobileFilter = /^[0-9]{10,11}$/;

   		var aramRegDetails = {};
   		var aramRegValidator = {};
		aramRegDetails.mailId = $('#id_aramRegEmail').val().trim();
	    aramRegDetails.password = $('#id_aramRegPass').val().trim();
	    aramRegDetails.repassword = $('#id_aramRegRePass').val().trim();
	    aramRegDetails.mobile = $('#id_aramRegPhone').val().trim();
	    aramRegDetails.dob = $('#id_aramRegDate').val().trim();
		aramRegDetails.country = $('#id_aramRegCountry').val().trim();
		aramRegDetails.state = $('#id_aramRegState').val().trim();
		aramRegDetails.city = $('#id_aramRegCity').val().trim();
		aramRegDetails.address = $('#id_aramRegAddrs').val().trim();
		aramRegDetails.firstname = $('#id_aramRegFirstName').val().trim();
		aramRegDetails.lastname = $('#id_aramRegLastName').val().trim();
		aramRegDetails.gender = $('#id_aramRegGender').val().trim();
		aramRegDetails.pincode = $('#id_aramRegPin').val().trim();

		aramRegValidator.mailId = false;
	    aramRegValidator.password = false;
	    aramRegValidator.repassword = false;
	    aramRegValidator.dob = false;
		aramRegValidator.firstname = false;
		aramRegValidator.lastname = false;
		aramRegValidator.mobile = false;

		$('.cls_aramRegErrormsg').removeClass('cls_aramRegErrorEL').hide();
	    if (!nameFilter.test(aramRegDetails.firstname)) 
	    {
	        $('#id_aramReg_arfirstname').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
	    	aramRegValidator.firstname = true;
	    }

	    if (!nameFilter.test(aramRegDetails.lastname)) 
	    {
	        $('#id_aramReg_arlastname').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
	        aramRegValidator.lastname = true;
	    }

	    if (!mobileFilter.test(aramRegDetails.mobile)) 
	    {
	        $('#id_aramReg_arphonenumber').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
	        aramRegValidator.mobile = true;
	    }

	    if (!emailFilter.test(aramRegDetails.mailId)) 
	    {
	        $('#id_aramReg_armailid').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
			aramRegValidator.mailId = true;
	    }

	    if (aramRegDetails.password.length < 8) 
	    {
	        $('#id_aramReg_arpasswd').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
			aramRegValidator.password = true;
	    }

	    if (aramRegDetails.password != aramRegDetails.repassword) 
	    {
	        $('#id_aramReg_arrepasswd').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
			aramRegValidator.repassword = true;
	    }

	    if (!aramRegDetails.dob) 
	    {
	        $('#id_aramReg_ardate').addClass('cls_aramRegErrorEL').html('Error').show();
	    } 
	    else 
	    {
			aramRegValidator.dob = true;
	    }

	    if (aramRegValidator.mobile && aramRegValidator.mailId && aramRegValidator.password && aramRegValidator.repassword && aramRegValidator.dob && aramRegValidator.firstname && aramRegValidator.lastname) 
	    {
	    	registrationPost(aramRegDetails);
	    }
	},
	registration.afterRegistrationPost = function(data){
		console.log(data);
	};
})(registration);

