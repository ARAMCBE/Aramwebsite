var db = require('../db/db.js');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var title = db.query("select * from user_details", [], function (err, result){
    // console.log("result: ", result);
	res.render('index', { title: result.rows[0].name});
  });
  // res.render('index', { title: title});
};