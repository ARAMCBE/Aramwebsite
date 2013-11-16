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
		// console.log("response : ", response.rows[0].password === req.body.password);
	});
};