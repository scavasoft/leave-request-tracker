const db = require('../db/database');

class UserRepository {
    insert = (object) => {
        let user = db.prepare('INSERT INTO users VALUES (?,?,?,?,?)');
        user.run(null, object.email, object.username, object.password, object.role.id, err => {
            if (err) {
                console.log('Error by user creating', err);
                return;
            }
        });
        console.log('Successfully is register ' + object.username);
    }

    findById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (row !== null) {
                callback(null, row);
            }
        });
    }

    findAllUsers = callback => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (rows !== null || rows.length > 0) {
                callback(null, rows);
            }
        });
    }

    delete = (id, callback) => {
        db.run('DELETE FROM users WHERE id = ?', [id], err => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    }

    //find by username
    findByUsername(username, callback) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (row !== null) {
                callback(null, row);
            }
        });
    }

    //find by username or email address
    findByUsernameOrEmail(username, email, callback) {
        db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (row !== null) {
                callback(null, row);
            }
        });
    }

    findRoleByAuthority(authority, callback){
        db.get('SELECT * FROM roles WHERE authority = ?', [authority], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (row !== null) {
                callback(null, row);
            }
        });
    }

    findRoleById(roleId, callback){
        db.get('SELECT * FROM roles WHERE id = ?', [roleId], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (row !== null) {
                callback(null, row);
            }
        });
    }
}

module.exports = UserRepository;