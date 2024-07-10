import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL;

class developerService {

    getDevelopers() {
        return axios.get(server_url + '/api/developer/getDevelopers');
    }
}

const newService = new developerService();
export default newService;