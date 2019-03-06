
module.exports = function (db, pgp) {
    const singlespa_user = new pgp.helpers.TableName('singlespa_user', 'public');
    const create_singlespa_user = pgp.as.format('CREATE TABLE IF NOT EXISTS $1(id SERIAL, name varchar(255))', singlespa_user);

    const seedTableList = [];
    seedTableList.push(create_singlespa_user);

    seedTableList.forEach(function (tableName) {
        db.query(tableName)
            .then(function () {
                console.log('successfully created table list');
            })
            .catch(function (error) {
                console.log(error);
            });
    })

}