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


var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./src/secret');


appServer.listen(port, function () {
    console.log('App listens on port ' + port + '!');
});


app.post('/api/register', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var user = {
        name: req.body.name,
        email: req.body.email,
        hashedPassword: hashedPassword
    };

    db.one('INSERT INTO singlespa_user(name, email, hashedPassword) VALUES($1, $2, $3) RETURNING id', [user.name, user.email, user.hashedPassword])
        .then(function (user) {
            console.log('successfully added new singlespa_user record');
            console.log('user: ', user);
            // create a token
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.cookie('spaAuthCookie', token, { maxAge: 900000, httpOnly: true });
            res.status(200).send({ auth: true, token: token });
        }, function (error) {
            return res.status(500).send("There was a problem registering the user.")
        });
});

app.get('/api/me', function (req, res) {
    var token;
    if (req.headers['cookie']) {
        console.log(req.headers['cookie'].split('=')[1]);
        token = req.headers['cookie'].split('=')[1];
    }

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send(decoded);
    });
});

const pgp = require('./src/pgp')();
const db = require('./src/db')(pgp);
require('./src/seed')(db, pgp);

// app.all("/api/*", function (req, res) {

//     console.log(proxyUrl);
//     if (req.headers['cookie']) {
//         var authRegexp = /Authorization=\"(.*)\"/gmi;
//         if (req.headers['cookie'].match(authRegexp)) {
//             var bearerTokenMatch = authRegexp.exec(req.headers['cookie']);
//             req.headers['Authorization'] = bearerTokenMatch[1];
//             req.headers['Accept'] = '*/*';
//             req.headers['Accept-Encoding'] = 'gzip, deflate';
//             req.headers['Connection'] = 'keep - alive';
//         }

//     }
//     req.pipe(request(proxyUrl))
//         .on('error', function (err) { console.log(err) })
//         .on('response', function (res) {
//             // res.headers['x-frame-options'] = "SAMEORIGIN";
//             res.headers['accept-encoding'] = 'deflate';
//         })
//         .pipe(res);
// });
