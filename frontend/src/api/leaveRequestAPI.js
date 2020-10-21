import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/leaveRequests/request', data);
}

export default new LeaveRequestAPI();