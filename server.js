// DEPENDENCIES
// ============

// Initialize Express app
var express = require('express');
// var router = require('router');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser'); // for working with cookies
// and we bring in our models folder. This brings in the model's object, as defined in index.js
var models = require('./models');
var burgers_controller = require('./controller/burgers_controller');
var users_controller = require('./controller/users_controller');

var app = express();




// override POST to have PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({
	secret: 'app',
	cookie: { maxAge: 60000} ,
	resave: true,
  saveUninitialized: true
	}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));


//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));

app.use('/', burgers_controller);
app.use('/users', users_controller);

// sync the tables
models.sequelize.sync();


// // app listens on port 3000
// app.listen(3000, function() {
// 	console.log("Listening on port 3000")
// })

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


// module.exports = app;