var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
const pgp = require('./src/pgp')();
const db = require('./src/db')(pgp);
require('./src/seed')(db, pgp);

db.none('INSERT INTO singlespa_user(name) VALUES($1)', ['John'])
    .then(() => {
        console.log('successfully added new singlespa_user record');
    })
    .catch(error => {
        console.log('error while adding new singlespa_user record');
    });


var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

var appServer = http.createServer(app);
var port = 9999;

appServer.listen(port, function () {
    console.log('App listens on port ' + port + '!');
});

app.all("/api/*", function (req, res) {

    console.log(proxyUrl);
    if (req.headers['cookie']) {
        var authRegexp = /Authorization=\"(.*)\"/gmi;
        if (req.headers['cookie'].match(authRegexp)) {
            var bearerTokenMatch = authRegexp.exec(req.headers['cookie']);
            req.headers['Authorization'] = bearerTokenMatch[1];
            req.headers['Accept'] = '*/*';
            req.headers['Accept-Encoding'] = 'gzip, deflate';
            req.headers['Connection'] = 'keep - alive';
        }

    }
    req.pipe(request(proxyUrl))
        .on('error', function (err) { console.log(err) })
        .on('response', function (res) {
            // res.headers['x-frame-options'] = "SAMEORIGIN";
            res.headers['accept-encoding'] = 'deflate';
        })
        .pipe(res);
});
