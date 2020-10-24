const db = require('../db/database');

module.exports = class UserLeaveRepository {

    insert(object) {
        let stmt = db.prepare('INSERT INTO user_leaves VALUES (?,?,?,?,?,?,?)');

        stmt.run(null, object.reason, object.type, object.name, object.startDate, object.endDate, 0, err => {
            if (err) {
                console.log("Query was rejected, try again", err);
                return;
            }
        });
        console.log('Successfully added new request by ' + object.name);
    }

    findById = (id, callback) => {
        db.get('SELECT * FROM user_leaves WHERE id = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (row != null) callback(null, row);
        });
    }

    findAll = callback => {
        db.all('SELECT * FROM user_leaves', (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (rows !== null || rows.length > 0) {
                callback(null, rows);
            }
        });
    }

    obtainApprovedLeaves = callback => {
        const approved = 1;
        db.all('SELECT * FROM user_leaves WHERE is_approved = ?', [approved], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (rows !== undefined || rows.length > 0) {
                callback(null, rows);
            } else {
                callback(null, []);
            }
        })
    }

    delete = (id, callback) => {
        db.run('DELETE FROM user_leaves WHERE id = ?', [id], err => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    }
}