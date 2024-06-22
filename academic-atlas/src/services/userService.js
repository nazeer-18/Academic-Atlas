import axios from 'axios';
const server_url = 'https://academic-atlas-server.onrender.com';

class userService {
    login(data) {
        return axios.post(server_url + '/api/auth/login', data);
    }
    resetpwd(email, password) {
        return axios.post(server_url + '/api/auth/resetpwd', { email, password });
    }
    verify(email) {
        return axios.post(server_url + '/api/auth/verify-mail', { email });
    }
}

const newService = new userService();
export default newService;