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

const pgp = require('./src/pgp')();
const db = require('./src/db')(pgp);
require('./src/seed')(db, pgp);

require('./src/app/register')(app, db);
// From now on app will use jwt verification for all further api requests

app.get('/api/me', function (req, res) {
    res.status(200).send();
});
