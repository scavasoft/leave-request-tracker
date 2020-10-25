const sqlite3 = require('sqlite3').verbose();
const dbDir = require('../config/config');

const db = new sqlite3.Database(dbDir.DB_DIR, err => {
    if (err) {
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
    const users = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, username TEXT,
        password TEXT, role_id NUMERIC, 
        color TEXT
    )`;

    const user_leaves = `CREATE TABLE IF NOT EXISTS user_leaves (
        id INTEGER PRIMARY KEY AUTOINCREMENT, reason TEXT, type TEXT,
        name TEXT, date_start TEXT, date_end TEXT, is_approved NUMERIC,
        user_id NUMERIC NOT NULL,
        FOREIGN KEY (user_id)
            REFERENCES users (id)
    )`;

    const roles = `CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, authority TEXT
    )`;

    const user_roles = `CREATE TABLE IF NOT EXISTS user_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id NUMERIC, authority_id NUMERIC 
    )`;

    db.run(user_leaves, err => {
        if (err) {
            console.log('user_leaves table was not created');
            console.error(err.message);
            return;
        }
        console.log('Table user_leaves is created successfully');
    });

    db.run(users, err => {
        if (err) {
            console.log('users table was not created');
            console.error(err.message);
            return;
        }
        console.log('Table users is created successfully');
    });

    db.run(roles, err => {
        if (err) {
            console.log('roles table was not created');
            console.error(err.message);
            return
        }
        console.log('Table roles is created successfully');
    });

    db.run(user_roles, err => {
        if (err) {
            console.log('user_roles table was not created');
            console.error(err.message);
            return;
        }
        console.log('Table user_roles is created successfully');
    })
}

initializeTables();

module.exports = db;