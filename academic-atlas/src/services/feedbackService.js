import axios from 'axios';

const server_url = 'https://academic-atlas-server-yr73.onrender.com' || 'http://localhost:8080' || 'https://academic-atlas-server.onrender.com';

class FeedbackService {
    getToken() {
        return localStorage.getItem('atlasToken') || sessionStorage.getItem('atlasToken');
    }

    async checkExistingFeedback(userId) {
        try {
            const response = await axios.get(`${server_url}/api/feedback/${userId}`, {
                headers: { Authorization: `Bearer ${this.getToken()}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error checking existing feedback:', error);
            throw error;
        }
    }

    async submitFeedback(userId, rating, description) {
        try {
            const response = await axios.post(`${server_url}/api/feedback/submit`, {
                userId,
                rating,
                description
            }, {
                headers: { Authorization: `Bearer ${this.getToken()}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting feedback:', error);
            throw error;
        }
    }
}

const feedbackService = new FeedbackService();
export default feedbackService;