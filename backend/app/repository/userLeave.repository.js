const db = require('../db/database');

module.exports = class UserLeaveRepository {
    
    insert(object) {
        let stmt = db.prepare('INSERT INTO user_leaves VALUES (?,?,?,?,?,?)');

        stmt.run(null, object.reason, object.type, object.name, object.startDate, object.endDate, err => {
            if(err) {
                console.log("Query was rejected, try again", err);
                return;
            }
        });
        console.log('Query is successfully added');

        //close db
    }

    findAll = result => {
        db.all('SELECT * FROM user_leaves', (err, rows) => {
            if(err) {
                result(err, null);
                return;
            }

            if(rows !== null || rows.length > 0) {
                result(null, rows);
            }
        });

        //close db
    }

    delete = (id, result) => {
        db.run('DELETE FROM user_leaves WHERE id = ?', [id], err => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, null);
        });
    }
}