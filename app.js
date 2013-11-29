var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var pg = require('pg');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({secret:"12324567890"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

passport.serializeUser(function(user, done) {
	console.log("serializeUser", user);	
  	done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log("deserializeUser", user);
	if(user){
    	done(null, user);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, user.login
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);

app.get('/about', routes.about);

app.get('/login', function(req, res){
  res.send(JSON.stringify({success:false}));
});

app.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send(JSON.stringify({success:true, username:req.user.username}));
});

app.post('/logout', function(req, res) {
  req.logout();
  res.send(JSON.stringify({success:true}));
});

app.post('/registration', user.registration);
app.get('/registration', user.isAuthenticated, function(req, res){
	res.render('registration', {isValidUser : req.isAuthenticated()});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
