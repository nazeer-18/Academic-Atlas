import axios from 'axios';
const server_url = 'http://localhost:8080' || 'https://academic-atlas-server.onrender.com';

class contributionService {
    getContributions(userEmail) { 
        return axios.post(`${server_url}/api/contribution/getContributions/${userEmail}`);
    }
}

const newService = new contributionService();
export default newService;