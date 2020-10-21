import BaseAPI from './baseAPI';

class AuthenticationAPI extends BaseAPI {
    // api for user registration
    createNewUser = (data) => this.post('/user/register', data);
    // api for user login
    login = (data) => this.post('/user/login', data);
}

export default new AuthenticationAPI();