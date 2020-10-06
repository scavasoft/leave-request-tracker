import BaseAPI from './baseAPI';

class LeaveRequestAPI extends BaseAPI {

    addNewRequest = data => this.post('/requestUserLeave', data);
    //addNewRequest = data => console.log(data);
}

export default new LeaveRequestAPI();