var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');

var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var passportLocal  = require('passport-local');

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

mongoose.connect('mongodb://localhost/profil', function(err) {
  if (err) {
   throw err
  }
  var User = require('./user_model.js');

/*MongoClient.connect("mongodb://127.0.0.1:27017/local", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});*/

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(
      {_id: id},
      function(err, user) {
        console.log('a', user)
        done(err, user);
     });
   });

  passport.use(new passportLocal.Strategy(function(username, password, done) {

    console.log("bolosserie? : " + username + " sisi? : " +  password);

    User.findOne(
      {'username': username, 'password' : password},
      function(err, user){
        if (err) {
          return handleError(err);
        }	
        console.log('tryin', user);
        done(null, user)
    });
      
  }));


  app.get('/', function(req, res) {
    res.render('index.ejs', {
      isAuthenticated: req.user != null,
      user: req.user
    });
  })


  app.get('/login', function(req, res) {
    res.render('login.ejs')
  })

  app.post('/login', passport.authenticate('local'), function(req, res) {
    console.log(req.user)
    res.send('gg' + req.user.username + '/' + req.user.password);
  })

  var port = process.port || 1337;

  app.listen(port, function() {
    console.log('http://127.0.0.1:' + port + '/');
  })
})
