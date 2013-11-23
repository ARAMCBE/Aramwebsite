var db = require('../db/db.js');
var user = require('../db/model/user.js');
var md5 = require('MD5');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(email, password, done) {
	var query = "SELECT password, firstname, lastname, email from user_details where email like '" + email 
	+"' and password='" +  md5(password) + "'";
	console.log(query);

	db.query(query, [], function(err, response) {
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
	});
}


exports.isAuthenticated = function(req, res, next) {
	if(!req.isAuthenticated()) {
		next();
	}else{
		res.send(JSON.stringify({code:6, isValidUser: true}));
	}
}

exports.registration = function(req, res) {
	var requestBody = req.body;
	var userDetail = createUser(requestBody);
	user.validate(userDetail, function(error) {
		if(error === undefined || Object.keys(error).length == 0 ){
			persistUser(userDetail, function(error, data) {
				if(error){ // If error in store in db
					res.send(JSON.stringify({code: 2, message:"Error in registration"}));
				}else{
					res.status(201);
					res.send(JSON.stringify({code:5, success: true}));
				}
			});
		}else{//If any error in user details

			console.log("Error in user details", error);
			res.send(JSON.stringify(error));
		}
	});
};

var persistUser = function(user, callback) {
	var query = "INSERT INTO user_details (firstname, lastname, email, password, mobile, dob, country, state, city , address, pincode, gender)VALUES('" 
		+ user.firstname + "','"
		+ user.lastname + "','"
		+ user.emailId + "','"
		+ user.password + "','"
		+ user.mobile + "',"
		+ "to_date('" + user.dob +"','dd/mm/yyyy')" + ",'"
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
				if(data.rowCount > 1){
					res.send({success:true, username:user.firstname + user.lastname});
				}
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