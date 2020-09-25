module.exports = app => {
    const UserLeave = require('../controllers/userLeave.controller');

    app.post('/requestUserLeave', UserLeave.insert);

    app.get('/getById', UserLeave.findById);

    app.get('/admin/findAll', UserLeave.findAll);

    app.post('/admin/deleteUserLeave', UserLeave.delete);
}