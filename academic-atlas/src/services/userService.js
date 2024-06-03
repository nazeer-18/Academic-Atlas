import axios from 'axios';
const server_url = 'http://localhost:8080/';

class userService {
    login(data){
        return axios.post(server_url + 'api/auth/login',data);
    }
    
    resetpwd(data){
        return axios.post(server_url + 'api/auth/resetpwd',data);
    }
}

export default new userService();