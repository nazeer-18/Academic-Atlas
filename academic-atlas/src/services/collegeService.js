import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL;

const getColleges = () => axios.get(`${server_url}/api/college/get-colleges`);
const getCollegeById = (collegeId) => axios.get(`${server_url}/api/college/get-colleges/${collegeId}`);

const collegeService = {
    getColleges,
    getCollegeById,
};

export default collegeService;
