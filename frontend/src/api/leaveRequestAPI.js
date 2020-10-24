import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/requestUserLeave', data);

    obtainApprovedRequests = () => this.get('/leaveRequests/obtainApprovedLeaves');
}

export default new LeaveRequestAPI();