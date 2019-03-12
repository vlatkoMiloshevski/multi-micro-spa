const cn = {
    port: 5432,
    host: 'localhost',
    database: 'singlespa',
    user: 'singlespa',
    password: 'singlespa'
};

module.exports = function (pgp) {
    return pgp(cn);
}