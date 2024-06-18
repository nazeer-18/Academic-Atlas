import axios from 'axios';
const server_url =  'https://academic-atlas-server.onrender.com';

class resourceService {
    addExam(category, academicYear, branch, course, pdfFile, author) {
        console.log(category, academicYear, branch, course, pdfFile, author)
        return axios.post(`${server_url}/api/resources/addexam`, {
            category : category,
            academicYear : academicYear,
            branch : branch,
            course : course,
            pdfFile : pdfFile,
            author : author})
    }
    getExam(academicYear, branch, course) {
        return axios.post(`${server_url}/api/resources/getexam`, {
            academicYear : academicYear,
            branch : branch,
            course : course
        })
    }
}
const newService = new resourceService();
export default newService;