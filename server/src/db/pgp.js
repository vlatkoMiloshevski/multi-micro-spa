var promise = require('bluebird');

const initOptions = {
    // pg-promise initialization options...
    promiseLib: promise,
};

var pgp = require('pg-promise')(initOptions);

module.exports = function () {
    return pgp;
}