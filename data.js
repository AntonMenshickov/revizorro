var sqlite3 = require('sqlite3').verbose();

const config = require('./config.js')
const path = require('path');

const DATA_PATH = config.DB_PATH || path.join(__dirname, '/data/database.dat');

console.info('Loading database from:', DATA_PATH)

const db = new sqlite3.Database(DATA_PATH);

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS USERS (
        userId BIGINTEGER PRIMARY KEY,
        name TEXT,
        role TEXT,
        menuPath Text
    )`);

    // var stmt = db.prepare("INSERT INTO USERS VALUES (?)");
    // for (var i = 0; i < 10; i++) {
    // stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
    //     console.log(row.id + ": " + row.info);
    // });
});

// db.close();

const addUser = function (user) {
    return new Promise((res, rej) => {
        db.get(`SELECT * from USERS WHERE userId = ${user.userId};`, function (err, row) {
            if (err) {
                rej(err);
            }
            if (!row) {
                db.run(`INSERT INTO USERS (userId, name, role, menuPath) VALUES (${user.userId}, '${user.name}', '${user.role}', '${JSON.stringify(user.menuPath)}')`, function (row, err) {
                    if (err) {
                        rej(err);
                    }
                    if (row) {
                        res(row);
                    }
                })
            } else {
                rej(null)
            }
        })
    })
}

const getUser = function (userId) {
    return new Promise(function (res, rej) {
        db.get(`SELECT * from USERS WHERE userId = ${userId};`, function (err, row) {
            if (err) {
                rej(err);
            }
            if (row && row.menuPath) {
                row.menuPath = JSON.parse(row.menuPath)
            }
            res(row)
        })
    })
}

const updateUser = function (userId, update) {
    return new Promise(function (res, rej) {
        db.run(`UPDATE USERS
        SET name = '${update.name}',
            role = '${update.role}',
            menuPath = '${JSON.stringify(update.menuPath)}'
        WHERE
            userId = ${userId};`, function (row, err) {
            if (err) {
                rej(err);
            }
            res(row)
        })
    })
}

module.exports = {
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser,
}