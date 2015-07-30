var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');

var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var passportLocal  = require('passport-local');

mongoose.connect('mongodb://localhost/profil', function(err) {
  if (err) {
   throw err
   }
  else {
	console.log('ok2222')
	var User = require('./user_model.js');
	User.findOne({'pseudo': "Alexandre"} , {'password' : 'toto'}, function(rer, user){
		if (rer) {
			return 'toto';
		} else {
			console.log(user);
		}	
	});
  }

});

/*MongoClient.connect("mongodb://127.0.0.1:27017/local", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});*/

app.set('view engine', 'ejs');


app.use(bodyParser({
	extended:false
}));
app.use(cookieParser());
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {

	console.log("bolosserie? : " + username + " sisi? : " +  password);

	var User = require('./user_model.js');

	User.findOne({'pseudo': username} , {'password' : password}, function(err, user){
		if (err) {
		return handleError(err);
		}	
		console.log(user);
	});
		
	done(null, null);
}));


app.get('/', function(req, res) {
	res.render('index.ejs', {
		isAuthenticated: false,
		user: req.user
	});
})


app.get('/login', function(req, res) {
	res.render('login.ejs')
})

app.post('/login', passport.authenticate('local'), function(req, res) {

})

var port = process.port || 1337;

app.listen(port, function() {
	console.log('http://127.0.0.1:' + port + '/');
})
mongoose.connection.close();