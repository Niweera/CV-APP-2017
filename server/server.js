var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    student = require('./app/api/student-api'),
    cv = require('./app/api/cv-api'),
    company = require('./app/api/company-api'),
    studentCompany = require('./app/api/student-company-api'),
    selectedStudentCompany = require('./app/api/selected-student-company-api'),
    studentSchedule = require('./app/api/student-schedule-api'),
    schedule = require('./app/api/schedule-api'),
    user = require('./app/api/user-api'),
    remoteValidation = require('./app/api/validation'),
    app = express(),
    mongoose = require('mongoose'),
    http_port = process.env.HTTP_PORT || 80,
    https_port=process.env.HTTPS_PORT || 8081,
    passport = require('passport');

var jwt = require('express-jwt');
var config = require('./app/config/conf');
var morgan = require('morgan');
var fs = require('fs');
var https = require('https');
const Sentry = require('@sentry/node');

//Sentry Remote Error Tracking
Sentry.init({ dsn: 'https://43a064cb4bf14203a58728c616f327c4@sentry.io/1551311' });

mongoose.connect(
    config.database,
    {
        useMongoClient: true
    },
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to mongodb!");
        }
    }
);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});

// setup the logger
app.use(morgan('common', {
    stream: accessLogStream
}));

// logger stdout
app.use(morgan('dev'));

////////

// var myLogger = function (req, res, next) {
//   console.log('LOGGED');
//   next();
// };
//
// app.use(myLogger);

// check if the request is https
////////////////////////////////////////////////df////////
//
//Set Static Folder
app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(__dirname, '../client2')));

app.use('/assets', express.static('../client/assets'));
app.use('/uploads', express.static('assets/uploads'));
require('./app/config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


//Body-parser
app.use(bodyParser.json({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));
//for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: 1024 * 1024 * 10
}));

// routes ======================================================================
// Load our routes and pass in our app and fully configured passport
require('./app/api/auth.js')(app, passport);

// app.use(function (req, res, next) {
//   console.log(req.secure);
//   console.log(req.isAuthenticated());
//   next();
// });

app.use('/student', student);
app.use('/cv', cv);
app.use('/company', company);
app.use('/student_company', studentCompany);
app.use('/selected_student_company', selectedStudentCompany);
app.use('/student_company', studentCompany);
app.use('/validation', remoteValidation);
app.use('/student_schedule', studentSchedule);
app.use('/schedule', schedule);
app.use('/user', user);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            success: false,
            msg:err.message,
            error: err
        });
        console.log("Log - Unauthorized Error");
    } else {
        console.log("Log - Unhandled");
        console.log("message" + err.name + ": " + err.message);
        res.json({
            success: false,
            msg:err.message,
            error: err
        });
    }
});

app.listen(http_port, function () {
    console.log('HTTP Server started on port: ' + http_port);
});

// const httpsOptions = {
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', 'ucsc-career-fair-2019_live.crt')),
//     key: fs.readFileSync(path.join(__dirname, 'ssl', 'ucsc-career-fair-2019_live.key')),
//     passphrase: ''
// }

// https.createServer(httpsOptions, app)
//     .listen(https_port, () => console.log("HTTPS Server is running at port: "+ https_port))
