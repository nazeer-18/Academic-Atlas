import axios from 'axios';
const server_url = 'http://localhost:8080';

class userService {
    fetchUser(email) {
        return axios.post(server_url + '/api/auth/fetch-user', { email })
    }
    login(data) {
        return axios.post(server_url + '/api/auth/login', data);
    }
    validateToken(token) {
        return axios.post(server_url + '/api/auth/validate', {
            headers: { Authorization: `${token}` }
        })
    }
    register(data) {
        return axios.post(server_url + '/api/auth/register', data);
    }
    resetPassword(email, password) {
        return axios.post(server_url + '/api/auth/reset-password', { email, password });
    }
    verify(data) {
        return axios.post(server_url + '/api/auth/verify-mail', data);
    }
    verifyForgot(email) {
        return axios.post(server_url + '/api/auth/verify-forgot-mail', { email });
    }
    changeName(email, userName) {
        return axios.post(server_url + '/api/auth/change-name', { email, userName });
    }
    getUserCount() {
        return axios.get(server_url + '/api/auth/fetch-all-users-count');
    }
}

const newService = new userService();
export default newService;