var db = require('../db/db.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: "Welcome"});
};