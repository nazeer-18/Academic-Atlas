import React,{useState} from 'react'
import resourceService from '../services/resourceService'

export default function Contribute() {
    const [data, setData] = useState({
        title: '',
        category: '',
        author: '',
        academicYear: '',
        branch: '',
        course: '',
        Link: '',
        Description: '',
        pdfFile: ''
    })
    const handleSubmit = async () => {
        console.log(data)
        const response = await resourceService.addExam(data.category, data.academicYear, data.branch, data.course, data.pdfFile, data.author)
            .then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                }
                else {
                    alert(res.data.message);
                }
            }).catch(err => {
                alert(err);
            })
    }
    return (
        <div>
            <h1>Contribute</h1> 
            <input 
                type="text" 
                placeholder="Title" 
                value={data.title}
                onChange={(e) => setData({...data, title: e.target.value})}
            /> <br />
            <input
                type="text"
                placeholder="Author"
                value={data.author}
                onChange={(e) => setData({...data, author: e.target.value})}
            /> <br />
            <input
                type="text"
                placeholder="Year"
                value={data.academicYear}
                onChange={(e) => setData({...data, academicYear: e.target.value})}
            /> <br />
            <input
                type="text"
                placeholder="Link"
                value={data.Link}
                onChange={(e) => setData({...data, Link: e.target.value})}
            /> <br />
            <input
                type="text"
                placeholder="Description"
                value={data.Description}
                onChange={(e) => setData({...data, Description: e.target.value})}
            /> <br />
            <input
                type="file"
                placeholder="PDF file"
                value={data.pdfFile}
                onChange={(e) => setData({...data, pdfFile: e.target.value})}
            /> <br />
            <select
                value={data.category}
                onChange={(e) => setData({...data, category: e.target.value})}
            >
                <option value="exam">Exam</option>
                <option value="capstone">Capstone</option>
            </select> <br />
            <input
                type="text"
                placeholder="Branch"
                value={data.branch}
                onChange={(e) => setData({...data, branch: e.target.value})}
            /> <br />
            <input
                type="text"
                placeholder="Course"
                value={data.course}
                onChange={(e) => setData({...data, course: e.target.value})}
            /> <br />
            
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
