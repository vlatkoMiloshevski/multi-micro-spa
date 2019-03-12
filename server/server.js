var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

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

const pgp = require('./src/db/pgp')();
const db = require('./src/db/connection')(pgp);
require('./src/db/seed')(db, pgp);

require('./src/app/auth/auth')(app, db);
require('./src/app/auth/middleware')(app);
// From now on app will use jwt verification for all further api requests

// test api
app.get('/api/me', function (req, res) {
    res.status(200).send();
});
