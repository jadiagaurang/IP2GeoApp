'use strict';
const debug = require('debug');
const dotenv = require("dotenv");
const express = require('express');
const fs = require("fs");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const geoip = require('./routes/geoip');

var app = express();

// Load Environment Variables from the Config File
const args = process.argv;
const fileName = path.dirname(fs.realpathSync(__filename));

// Work on the Args
if (args.length > 2) {
    var objEnv = args[2];
    
    if (objEnv === "prod") {
        dotenv.config({ path: path.join(fileName, "./config/prod.env") });
    }
    else {
        dotenv.config({ path: path.join(fileName, "./config/dev.env") });
    }
}
else {
    dotenv.config({ path: path.join(fileName, "./config/dev.env") });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', geoip);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: "Error",
            message: err.message,
            error: err
        });
    });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: "Error",
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = server