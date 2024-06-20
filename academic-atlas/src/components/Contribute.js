import React, { useState } from 'react';
import resourceService from '../services/resourceService';

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
        pdfFile: null,
    });

    const handleFileChange = (e) => {
        setData({ ...data, pdfFile: e.target.files[0] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('academicYear', data.academicYear);
        formData.append('branch', data.branch);
        formData.append('course', data.course);
        formData.append('Link', data.Link);
        formData.append('Description', data.Description);
        formData.append('pdfFile', data.pdfFile);

        try {
            const res = await resourceService.addExam(formData);
            if (res.data.success) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h1>Contribute</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                /> <br />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={data.author}
                    onChange={handleChange}
                /> <br />
                <input
                    type="text"
                    name="academicYear"
                    placeholder="Year"
                    value={data.academicYear}
                    onChange={handleChange}
                /> <br />
                <input
                    type="text"
                    name="Link"
                    placeholder="Link"
                    value={data.Link}
                    onChange={handleChange}
                /> <br />
                <input
                    type="text"
                    name="Description"
                    placeholder="Description"
                    value={data.Description}
                    onChange={handleChange}
                /> <br />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                /> <br />
                <select
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                >
                    <option value="exam">Exam</option>
                    <option value="capstone">Capstone</option>
                </select> <br />
                <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    value={data.branch}
                    onChange={handleChange}
                /> <br />
                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={data.course}
                    onChange={handleChange}
                /> <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
