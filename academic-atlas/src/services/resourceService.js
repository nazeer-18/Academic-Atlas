import axios from 'axios';
const server_url = 'https://academic-atlas-server-yr73.onrender.com' || 'http://localhost:8080' || 'https://academic-atlas-server.onrender.com';

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
    downloadPdf = async (fileId,fileName) => { 
        try { 
            const response = await axios.get(`${server_url}/api/resources/download/${fileId.fileId}`, {
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
}
const newService = new resourceService();
export default newService;