import axios from 'axios'; 

const server_url = 'https://academic-atlas-server-yr73.onrender.com' || 'https://academic-atlas-server.onrender.com';

class FeedbackService {
    checkExistingFeedback(email) {
        return axios.get(`${server_url}/api/feedback/get-feedback/${email}`);
    }
    
    submitFeedback(email, rating, description) {
        return axios.post(`${server_url}/api/feedback/submit`, {email, rating, description});
    }

    getAllFeedbacks() {
        return axios.get(`${server_url}/api/feedback/all`);
    }
}

const feedbackService = new FeedbackService();
export default feedbackService;