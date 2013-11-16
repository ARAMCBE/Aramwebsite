var db = require('../db/db.js');
/*
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
	var query = "SELECT password from user_details where email like '" + req.body.email +"'";

	db.query(query, [], function(err, response) {
		if(err){
			console.log("Error in password Retrival", err);
		}
		if(response.rows[0] !== undefined) {
			req.session.hash = req.body.email;
			res.send(req.session.hash);
		}
	});
};