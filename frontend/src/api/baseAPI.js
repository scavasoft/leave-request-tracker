import axios from 'axios';

const SERVER_IP = 'http://localhost';
const SERVER_PORT = '8090';

export const API_URL = `${SERVER_IP}:${SERVER_PORT}/`;

export const RETRY_CONNECTION_TIMEOUT = 1000000;

class BaseAPI {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: RETRY_CONNECTION_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        this.setInterceptors();
    }

    setInterceptors() {
        this.api.interceptors.request.use(req => {
            const jwt = localStorage.getItem('token');
            if (jwt) {
                const token = `Bearer ${jwt}`;
                req.headers['Authorization'] = token;
            }
            return req;
        });
    }

    get = (url, options) => this.api.get(url, options);

    post = (url, data, options) => this.api.post(url, data, options);
}

export default BaseAPI;

