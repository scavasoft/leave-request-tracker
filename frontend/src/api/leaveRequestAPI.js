import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/leaveRequests/request', data);

    updateApprove = data => this.post('/leaveRequests/updateApprove', data);

    getAllLeaveRequests = () => this.get('/leaveRequests/admin/findAll');

    paginatedLeaveRequests = (page, size) => this.get(`/leaveRequests/admin/findAll?page=${page}&size=${size}`);

    getLeaveRequestById = id => this.get(`/leaveRequests/getById?id=${id}`);

    deleteLeaveRequest = id => this.post('/leaveRequests/delete', id);

    obtainApprovedRequests = () => this.get('/leaveRequests/obtainApprovedLeaves');
}

export default new LeaveRequestAPI();