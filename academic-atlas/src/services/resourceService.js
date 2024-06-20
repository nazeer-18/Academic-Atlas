import axios from 'axios';
const server_url = 'https://academic-atlas-server.onrender.com';

class resourceService {
    addExam(formData) {
        return axios.post(`${server_url}/api/resources/addexam`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    getExam(academicYear, branch, course) {
        return axios.post(`${server_url}/api/resources/getexam`, {
            academicYear: academicYear,
            branch: branch,
            course: course
        })
    }
}
const newService = new resourceService();
export default newService;