
module.exports = function (db, pgp) {
    const singlespa_user = new pgp.helpers.TableName('singlespa_user', 'public');
    const create_singlespa_user = pgp.as.format(`CREATE TABLE IF NOT EXISTS $1(id SERIAL, username varchar(255), email varchar(255), hashedPassword varchar(255))`, singlespa_user);

    db.query(create_singlespa_user)
        .then(function () {
            console.log('successfully created table list');
        })
        .catch(function (error) {
            console.log(error);
        });

}