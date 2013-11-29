
exports.index = function(req, res) {
	res.render('index', {isValidUser : req.isAuthenticated()});
};

exports.about = function(req, res) {
	res.render('about', {isValidUser : req.isAuthenticated()});
};