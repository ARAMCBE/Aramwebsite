
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
	that.pincode = user.pincode || 0;

	var validateMail = function(cb) {
		console.log("In validateMail");
		var error = {};
		db.query("select count(1) as exists from user_details where email like '" + 
			that.emailId + "'", [], function(err, response) {
			console.log("Validating : ", response);
			if(response.rows[0].exists > 0) {
				error = {code:1, id :"mailId", message:"MaildId already exists" };
			}
			cb(error);
		});
	};

	var save = function(callback) {
		console.log("In Save");
		var query = "INSERT INTO user_details "
		+"(firstname, lastname, email, password, mobile, dob, "
		+"country, state, city , address, pincode, gender) VALUES('" 
			+ this.firstname + "','"
			+ this.lastname + "','"
			+ this.emailId + "','"
			+ this.password + "','"
			+ this.mobile + "',"
			+ "to_date('" + this.dob +"','dd/mm/yyyy')" + ",'"
			+ this.country + "','"
			+ this.state + "','"
			+ this.city + "','"
			+ this.address + "',"
			+ this.pincode + ",'"
			+ this.gender + "')";

		// console.log(query);
		var callbackType = typeof callback;
		console.log("Type: " , callbackType);
		db.query(query, [], callback);
	};

	that.save = save;
	that.validateMail = validateMail;
	return that;
};

exports.login = function(email, password, callback){
	var query = "SELECT password, firstname, lastname, email from user_details where email like '" + email 
	+"' and password='" +  md5(password) + "'";
	console.log(query);

	db.query(query, [], callback);
}
