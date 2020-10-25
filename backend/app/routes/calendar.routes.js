module.exports = app => {
    const UserLeave = require('../controllers/userLeave.controller');

    app.post('/leaveRequests/request', UserLeave.insert);

    app.post('/leaveRequests/updateApprove', UserLeave.update);

    app.get('/leaveRequests/getById', UserLeave.findById);

    app.post('/leaveRequests/delete', UserLeave.delete);

    app.get('/leaveRequests/admin/findAll', UserLeave.findAll);

    app.get('/leaveRequests/admin/findAll', UserLeave.pagination);

    app.get('/leaveRequests/obtainApprovedLeaves', UserLeave.obtainApprovedLeaves);

}