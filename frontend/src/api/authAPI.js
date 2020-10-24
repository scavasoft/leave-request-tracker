import BaseAPI from './baseAPI';

class AuthenticationAPI extends BaseAPI {
    // api for user registration
    createNewUser = (data) => this.post('/user/register', data);

    // api for user login
    login = (data) => this.post('/user/login', data);

    // get user information, back-end will check our token
    getUserByToken = () => this.get('/user/session');
}

export default new AuthenticationAPI();