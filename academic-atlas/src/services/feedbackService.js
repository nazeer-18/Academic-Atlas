import axios from 'axios'; 
const server_url = process.env.REACT_APP_SERVER_URL;

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