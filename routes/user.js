var db = require('../db/db.js');
var user = require('../db/model/user.js');
var md5 = require('MD5');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(email, password, done) {
	var loginCallback = function(err, response) {
		var dbRes = response.rows;
		if(err){
			return done(err);
		}
		if(dbRes.length == 0 || Object.keys(dbRes[0]).length == 0) {
			return done(null, false, { message: 'Incorrect username or password' });
		}
		if(dbRes.length > 0 && Object.keys(dbRes[0]).length > 0) {
			var displayName = dbRes[0].firstname + " " + dbRes[0].lastname;
			return done(null, {username: displayName, email: dbRes[0].email});
		}
	};
	user.login(email, password, loginCallback);
}

exports.isAuthenticated = function(req, res, next) {
	if(!req.isAuthenticated()) {
		next();
	}else{
		res.redirect("/");
	}
}

exports.registration = function(req, res) {
	var requestBody = req.body;
	var userDetail = createUser(requestBody);
	userDetail.validateMail(function(error) {
		console.log("Validating ....");
		if(error === undefined || Object.keys(error).length == 0 ){
			console.log("No error");
			userDetail.save(function(error, data) {
				if(error) { // If error while inserting in db
					res.send(JSON.stringify({code: 2, message:"Error in registration"}));
				} else { // Happy path
					res.status(201);
					res.send(JSON.stringify({code:5, success: true}));
				}
			});
		}else{ // If any error in user details
			console.log("Error in user details", error);
			res.send(JSON.stringify(error));
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