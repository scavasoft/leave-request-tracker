const db = require('../db/database');

class UserRepository {
    insert(object) {
        let user = db.prepare('INSERT INTO users VALUES (?,?,?,?)');

        user.run(null, object.email, object.username, object.password, err => {
            if (err) {
                console.log('Error by user creating', err);
                return;
            }
        });
        console.log('Query is added successfully');
    }

    findUserByNameAndPassword(username, password, callback) {
        db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            // console.log('row + ',row)
            if (row !== null) {
                callback(null, row);
            }
        });
    }

    findById(id, callback) {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (row != null) {
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

        //close db
    }

    delete = (id, callback) => {
        db.run('DELETE FROM users WHERE id = ?', [id], err => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });

        // close db
    }
}

module.exports = UserRepository;