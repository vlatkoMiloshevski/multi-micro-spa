
var jwt = require('jsonwebtoken');
var config = require('../../secret');

module.exports = function (app) {

    app.use(function (req, res, next) {
        var token, spa_auth_cookie;
        if (req.headers['cookie']) {
            var spa_auth_cookie = req.headers['cookie'].split('; ').find(x => x.split('=')[0] == 'spa_auth_cookie');
        }

        if (spa_auth_cookie) {
            console.log(spa_auth_cookie.split('=')[1]);
            token = spa_auth_cookie.split('=')[1];
        }

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next();
        });
    })

}
