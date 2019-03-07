
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../secret');

module.exports = function (app, db) {
    app.post('/api/register', function (req, res) {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        var user = {
            username: req.body.username,
            email: req.body.email,
            hashedPassword: hashedPassword
        };

        db.one('INSERT INTO singlespa_user(username, email, hashedPassword) VALUES($1, $2, $3) RETURNING id, username', [user.username, user.email, user.hashedPassword])
            .then(function (user) {
                console.log('successfully added new singlespa_user record');
                console.log('user: ', user);
                // create a token
                var token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 60 // expires in 24 hours
                });

                res.cookie('spa_auth_cookie', token, { maxAge: 900000, httpOnly: true });
                res.status(200).send({ "user": user });
            }, function (error) {
                return res.status(500).send("There was a problem registering the user: ", error)
            });
    });

    app.post('/api/logout', function (req, res) {
        res.clearCookie('spa_auth_cookie');
        res.status(200).send();
    });

    app.use(function (req, res, next) {
        var token, spa_auth_cookie;
        if (req.headers['cookie']) {
            var spa_auth_cookie = req.headers['cookie'].split('; ').find(x => x.split('=')[0] == 'spa_auth_cookie');
        }

        if (spa_auth_cookie) {
            console.log(spa_auth_cookie.split('=')[1]);
            token = spa_auth_cookie.split('=')[1];
        }

        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next();
        });
    })

}
