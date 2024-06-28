import axios from 'axios';
const server_url = 'https://academic-atlas-server-yr73.onrender.com' || 'https://academic-atlas-server.onrender.com';

class developerService {

    getDevelopers() {
        return axios.get(server_url + '/api/developer/getDevelopers');
    }
}

const newService = new developerService();
export default newService;