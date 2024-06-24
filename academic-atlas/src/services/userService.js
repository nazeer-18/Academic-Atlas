import axios from 'axios';
const server_url = 'https://academic-atlas-server.onrender.com';

class userService {
    login(data) {
        return axios.post(server_url + '/api/auth/login', data);
    }
    register(data) {
        return axios.post(server_url + '/api/auth/register', data);
    }
    resetpwd(email, password) {
        return axios.post(server_url + '/api/auth/resetpwd', { email, password });
    }
    verify(email) {
        return axios.post(server_url + '/api/auth/verify-mail', { email, });
    }
    verifyForgot(email) {
        return axios.post(server_url + '/api/auth/verify-forgot-mail', { email });
    }
    changeName(email, userName) {
        return axios.post(server_url + '/api/auth/change-name', { email, userName });
    }
}

const newService = new userService();
export default newService;