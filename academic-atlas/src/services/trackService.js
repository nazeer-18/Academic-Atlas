import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL;

class trackService {
    getBranches() {
        return axios.get(`${server_url}/api/track/getBranches`)
    }
    getCourses() {
        return axios.get(`${server_url}/api/track/getCourses`)
    }
}

const newTrackService = new trackService();
export default newTrackService;