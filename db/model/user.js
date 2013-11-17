
var md5 = require('MD5');
var db = require('../db.js');

exports.createUser = function (user) {
	var that = {};
	that.firstname = user.firstname;
	that.lastname = user.lastname;
	that.emailId = user.emailId;
	that.mobile = user.mobile;
	that.password = md5(user.password);
	that.dob = user.dob;
	that.gender = user.gender;
	that.country = user.country;
	that.state = user.state;
	that.city = user.city;
	that.address = user.address;
	that.pincode = user.pincode;

	var validateMail = function(error, cb) {
		db.query("select count(1) as exists from user_details where email like '" + that.emailId + "'", [], function(err, response) {
			console.log(response);
			if(response.rows[0].exists > 0) {
				error.armail = error.armail || [];
				error.armail.push(1);  // 1 -> Mail id duplication.
			}
			cb(error);
		});
	}

	that.validateMail = validateMail;
	return that;
};


exports.validate = function(user, cb) {
	var errors = {};
	for(var key in user) {
		if(user.hasOwnProperty(key) && typeof user[key] == 'function') {
			user[key](errors, cb);
		}
	}
}
