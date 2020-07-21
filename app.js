if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// utilities
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser= require('body-parser');
var exphs = require('express-handlebars');


//passport
let passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('./config/passport-config');
initializePassport(passport);

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// helpers
var {formatProductOptions, increment, formatPaymentType ,formatPaymentStatus} = require('./helpers/order');

var app = express();

// app.use(logger('dev'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set default engine
app.set('view engine', 'handlebars');
app.engine('handlebars', exphs({defaultLayout: 'index',helpers: {formatProductOptions, increment, formatPaymentStatus,formatPaymentType}}));


//passport session
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

//login route
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect:'/',
    failureFlash: true
}));

//set locals if login
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
  });


// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/', indexRouter);
app.use('/api', usersRouter);

// set port
const PORT  = process.env.PORT || 4500;


// listen to server
app.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('Listening on port ' + PORT);
    }
})

module.exports = app;
