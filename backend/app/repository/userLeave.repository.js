const db = require('../db/database');

module.exports = class UserLeaveRepository {
    
    insert(object) {
        let stmt = db.prepare('INSERT INTO user_leaves VALUES (?,?,?,?,?,?,?,?)');

        stmt.run(null, object.reason, object.type, object.name, object.startDate, object.endDate, 0, object.userId, err => {
            if(err) {
                return console.log("Query was rejected, try again", err);
            }
        });
        console.log('Successfully is added new request by ' + object.name);
    }

    update(id, userLeaveName) {
        const sql = `UPDATE user_leaves
            SET is_approved = 1
            WHERE id = ?`;

        db.run(sql, id, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Approve is updated on: ${userLeaveName}`);

        });
    }

    findById = (id, callback) => {
        db.get('SELECT * FROM user_leaves WHERE id = ?', [id], (err, row) => {
            if(err) {
                callback(err, null);
                return;
            }

            if(row != null) callback(null, row);
        });
    }

    findAll = callback => {
        db.all('SELECT * FROM user_leaves', (err, rows) => {
            if(err) {
                callback(err, null);
                return;
            }

            if(rows !== null || rows.length > 0) {
                callback(null, rows);
            }
        });
    }

    delete = (id, callback) => {
        db.run('DELETE FROM user_leaves WHERE id = ?', [id], err => {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    }
}