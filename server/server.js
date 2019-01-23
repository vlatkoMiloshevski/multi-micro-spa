var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

var appServer = http.createServer(app);
var port = 7000;
 
appServer.listen(port, function () {
    console.log('App listens on port ' + port + '!');
});


app.get('/api/usernameList', (req, res) => {
    console.log('node server - /api/usernameList');
    request.get('http://jsonplaceholder.typicode.com/users', function (error, response, body) {
        res.send(JSON.parse(response.body));
    });
});


app.get('/api/emailList', (req, res) => {
    console.log('node server - /api/emailList');
    request.get('http://jsonplaceholder.typicode.com/users', function (error, response, body) {
        res.send(JSON.parse(response.body));
    });
});
