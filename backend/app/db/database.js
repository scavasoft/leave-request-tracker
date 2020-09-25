const sqlite3 = require('sqlite3').verbose();
const dbDir = require('../config/config');

const db = new sqlite3.Database(dbDir.DB_DIR, err => {
    if(err) {
        console.error(err.message);
        process.exit(1);
    }

    console.log('Connected to the SQlite database.');
});

//close the database connection
db.close = ((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
});

function initializeTables() {
    //Initialize tables
    const user_leaves = `CREATE TABLE IF NOT EXISTS user_leaves (
        id INTEGER PRIMARY KEY AUTOINCREMENT, reason TEXT, type TEXT,
        name TEXT, date_start TEXT, date_end TEXT
    )`;

    db.run(user_leaves, err => {
        if(err) {
            console.log('user_leaves table was not created');
        }
    });
}

initializeTables();

module.exports = db;