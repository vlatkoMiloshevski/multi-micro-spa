
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../secret');

module.exports = function (app, db) {
    app.post('/api/register', async function (req, res) {
        var hashedpassword = bcrypt.hashSync(req.body.password, 8);
        var reqUser = {
            username: req.body.username,
            email: req.body.email,
            hashedpassword: hashedpassword
        };

        db.any('SELECT * FROM singlespa_user WHERE username=$1', [req.body.username])
            .then(function (user) {
                if (user.length && bcrypt.compareSync(req.body.password, user[0].hashedpassword)) {
                    // create a token
                    let userAuthObject = { id: user[0].id };
                    var token = getSignedJwtToken(userAuthObject);

                    res.cookie('spa_auth_cookie', token, { maxAge: 900000, httpOnly: true });
                    delete user.hashedpassword;
                    res.status(200).send({ "user": user[0] });
                    return;
                }

                db.one('INSERT INTO singlespa_user(username, email, hashedpassword) VALUES($1, $2, $3) RETURNING id, username', [reqUser.username, reqUser.email, reqUser.hashedpassword])
                    .then(function (user) {
                        console.log('successfully added new singlespa_user record');
                        console.log('user: ', user);
                        // create a token
                        let userAuthObject = { id: user.id };
                        var token = getSignedJwtToken(userAuthObject);

                        res.cookie('spa_auth_cookie', token, { maxAge: 900000, httpOnly: true });
                        delete user.hashedpassword;
                        res.status(200).send({ "user": user });
                    }, function (error) {
                        return res.status(500).send("There was a problem registering the user: ", error)
                    });
            })
    });

    app.post('/api/login', function (req, res) {
        db.any('SELECT * FROM singlespa_user WHERE username=$1', [req.body.username])
            .then(function (user) {
                if (!user.length) {
                    res.status(400).send({ message: "user does not exist" });
                    return;
                }

                if (!bcrypt.compareSync(req.body.password, user[0].hashedpassword)) {
                    res.status(400).send({ message: "credentials don't match" });
                    return;
                }

                console.log('user: ', user[0]);
                // create a token
                let userAuthObject = { id: user[0].id };
                var token = getSignedJwtToken(userAuthObject);

                res.cookie('spa_auth_cookie', token, { maxAge: 900000, httpOnly: true });
                delete user[0].hashedpassword;
                res.status(200).send({ "user": user[0] });
            }, function (error) {
                return res.status(400).send("No such user: ", error)
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

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next();
        });
    })

}

function getSignedJwtToken(userAuthObject) {
    jwt.sign(userAuthObject, config.secret, {
        expiresIn: 60, // expires in 24 hours,
        httpOnly: true,
        secure: true
    });
}