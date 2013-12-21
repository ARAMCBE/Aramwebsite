var username = function(req) {
    if(req.user) {
        return req.user.username;
    }
    return "";
}

exports.index = function(req, res) {
	res.render('index', {isValidUser : req.isAuthenticated(), username:username(req)});
};

exports.about = function(req, res) {
	res.render('about', {isValidUser : req.isAuthenticated(), username:username(req)});
};

exports.faq = function(req, res) {
    res.render('faq', {isValidUser : req.isAuthenticated(), username:username(req)});
};

exports.gallery = function(req, res) {
    res.render('gallery', {isValidUser : req.isAuthenticated(), username:username(req)});
};

exports.contactus = function(req, res) {
    res.render('contactus', {isValidUser : req.isAuthenticated(), username:username(req)});
};