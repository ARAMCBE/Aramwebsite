var db = require('../db/db.js');
var user = require('../db/model/user.js');
var md5 = require('MD5');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
	var query = "SELECT password, email from user_details where email like '" + req.body.email +"'";

	db.query(query, [], function(err, response) {
		if(err){
			console.log("Error in password Retrival", err);
			res.status(401);
			res.send({error:{arlogin:1}}); //Invalid login
		}
		if(response.rows[0].password !== undefined) {
			var passhash = md5(response.rows[0].password);
			req.session.hash = response.rows[0].email;
			res.send({username:req.body.email, passhash: passhash});
		}
	});
};

exports.registration = function(req, res) {
	if(req.session.hash){ //If already logged in
		res.send({error: {code :1, message: "Already logged In"}, success: false});
	}else {
		var requestBody = req.body;
		var userDetail = createUser(requestBody);
		user.validate(userDetail, function(error) {
			if(error === undefined || Object.keys(error).length == 0 ){
				persistUser(userDetail, function(error, data) {
					if(error){ // If error in store in db
						res.status(400);
						res.send({error:{code: 2, message:"Error in registration"}, success: false});
					}else{
						res.send({success: true});
					}
				});
			}else{//If any error in user details
				console.log("Error in user details", error);
				res.status(400);
				res.send(error);
			}
		});
	}
};

var persistUser = function(user, callback) {
	var query = "INSERT INTO user_details (firstname, lastname, email, password, mobile, dob, country, state, city , address, pincode, gender)VALUES('" 
		+ user.firstname + "','"
		+ user.lastname + "','"
		+ user.emailId + "','"
		+ user.password + "','"
		+ user.mobile + "','"
		+ user.dob + "','"
		+ user.country + "','"
		+ user.state + "','"
		+ user.city + "','"
		+ user.address + "',"
		+ user.pincode + ",'"
		+ user.gender + "')";

console.log(query);

		db.query(query, [], function(err, data) {
			if(err){
				console.log("Error in INSERT");
			}else{
				console.log("DATA: ", data);
			}
		});
};

var createUser = function(body) {
	return user.createUser({
		emailId : body.mailId, 
		password : body.password,
		mobile : body.mobile,
		dob : body.dob,
		country : body.country,
		state : body.state,
		city : body.city,
		address : body.address,
		firstname : body.firstname,
		lastname : body.lastname,
		gender : body.gender,
		pincode : body.pincode		
	});
}