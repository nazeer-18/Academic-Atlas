import axios from 'axios';
const server_url = process.env.REACT_APP_SERVER_URL;

class resourceService {
    addExam(formData) {
        return axios.post(`${server_url}/api/resources/add-exam`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    getExam(academicYear, branch, course, category, author) {
        return axios.post(`${server_url}/api/resources/get-exam`, { academicYear, branch, course, category, author })
    }
    deleteExam(Id) {
        return axios.delete(`${server_url}/api/resources/delete-exam/${Id}`);
    }
    addCapstone(formData) {
        return axios.post(`${server_url}/api/resources/add-capstone`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    getCapstone(academicYear, branch, course, category, author) {
        return axios.post(`${server_url}/api/resources/get-capstone`, { academicYear, branch, course, category, author })
    }
    deleteCapstone(Id) {
        return axios.delete(`${server_url}/api/resources/delete-capstone/${Id}`);
    }
    downloadPdf = async (fileId, fileName) => {
        try {
            const response = await axios.get(`${server_url}/api/resources/download/${fileId}`, {
                responseType: 'blob', // Ensure the response is treated as a binary object
            });

            // Create a link element, set its href to the object URL, and trigger a download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
            throw error;
        }
    }

    getThumbnail(fileId) {
        return axios.get(`${server_url}/api/resources/getThumbnail/${fileId}`);
    }
    handleSummary(url,id){
        return axios.post(`${server_url}/api/resources/generateSummary`, {url,id});
    }
}
const newService = new resourceService();
export default newService;