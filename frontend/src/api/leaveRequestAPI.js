import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/requestUserLeave', data);
}

export default new LeaveRequestAPI();