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
var port = 9999;

appServer.listen(port, function () {
    console.log('App listens on port ' + port + '!');
});

// app.all("/api/*", function (req, res) {
//     console.log(req.url);
//     var hostname = "localhost"; //(req.headers.host.match(/:/g)) ? req.headers.host.slice(0, req.headers.host.indexOf(":")) : req.headers.host;
//     console.log(hostname);
//     var proxyUrl = 'http://' + hostname + ':' + process.env.API_PORT + req.url;
//     console.log(proxyUrl);
//     // if (req.headers['cookie']) {
//     //     var authRegexp = /Authorization=\"(.*)\"/gmi;
//     //     if (req.headers['cookie'].match(authRegexp)) {
//     //         var bearerTokenMatch = authRegexp.exec(req.headers['cookie']);
//     //         req.headers['Authorization'] = bearerTokenMatch[1];
//     //     }
//     // }

//     req.pipe(request(proxyUrl)).pipe(res);
// });

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
