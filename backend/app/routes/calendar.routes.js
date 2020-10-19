module.exports = app => {
    const UserLeave = require('../controllers/userLeave.controller');

    app.post('leaveRequests/request', UserLeave.insert);

    app.get('leaveRequests/getById', UserLeave.findById);

    app.post('leaveRequests/delete', UserLeave.delete);

    app.get('leaveRequests/admin/findAll', UserLeave.findAll);
}