import React, { useState, useEffect } from 'react';
import resourceService from '../services/resourceService';
import '../styles/ContributePage.css';
import trackService from '../services/trackService';

export default function Contribute() {
    const [data, setData] = useState({
        title: '',
        Description: '',
        Link: '',
        author: '',
        category: '',
        academicYear: '',
        branch: '',
        course: '',
        pdfFile: null,
    });

    const [branches, setBranches] = useState([]);
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i >= 2021; i--) {
        years.push(i + "-" + (i + 1));
    }
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const getTracks = async () => {
            try {
                const response = await trackService.getBranches();
                setBranches(response.data.branches);
                const response2 = await trackService.getCourses();
                setCourses(response2.data.courses);
            }
            catch (err) {
                console.log(err);
            }
        }
        getTracks();
        // eslint-disable-next-line
    }, [])

    const [choice, setChoice] = useState('');


    function handleFileChange(e) {
        setData({ ...data, pdfFile: e.target.files[0] });
    }

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
        <div className="contributepage">
            <div className="contribute-container">
                <div className="contribute-header">
                    Contribute Resource
                </div>
                <div className="contribute-content">
                    <label className='contributequestion' for="typefields">What would you like to contribute today ?</label>
                    <select
                        id="contribution"
                        name="contribution-choice"
                        onChange={(e) => setChoice((e.target.value === 'projects' || e.target.value === 'research') ? "capstone" : e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="projects">Projects</option>
                        <option value="research">Research Papers</option>
                        <option value="exam">Mid/End sem papers</option>
                    </select>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    {

                        choice === 'capstone' &&

                        <>
                            <label className="resultfields" htmlFor="title">Title: </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter title of your project"
                                value={data.title}
                                onChange={handleChange}
                            /> <br />

                            <label className="contributefields" htmlFor="title">Description: </label>
                            <input
                                type="text"
                                name="Description"
                                placeholder="Enter Description of your project"
                                value={data.Description}
                                onChange={handleChange}
                            /> <br />

                            <label className="contributefields" htmlFor="title">Link: </label>
                            <input
                                type="text"
                                name="Link"
                                placeholder="Paste the github link of your project"
                                value={data.Link}
                                onChange={handleChange}
                            /> <br />
                        </>
                    }

                    {

                        choice !== '' &&
                        <>
                            <label className="contributefields" htmlFor="category">Category: </label>
                            <select name="category" onChange={handleChange}>
                                <option value="">Select Category</option>
                                <option value="mid-sem">Mid Sem</option>
                                <option value="end-sem">End Sem</option>
                            </select> <br />

                            <label className="contributefields" htmlFor="title">Author: </label>
                            <input
                                type="text"
                                name="author"
                                placeholder="Enter author of your research paper"
                                value={data.author}
                                onChange={handleChange}
                            /> <br />
                            <label className="resultfields" htmlFor="title">Title: </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter title of your research paper"
                                value={data.title}
                                onChange={handleChange}
                            /> <br />

                            <label className="contributefields" htmlFor="title">Description: </label>
                            <input
                                type="text"
                                name="Description"
                                placeholder="Enter Description of your research paper"
                                value={data.Description}
                                onChange={handleChange}
                            /> <br />

                            <label className="contributefields" htmlFor="title">Link: </label>
                            <input
                                type="text"
                                name="Link"
                                placeholder="Paste the github link of your research paper"
                                value={data.Link}
                                onChange={handleChange}
                            /> <br />
                        </>
                    }


                    {
                        data && data.category !== '' &&
                        <>


                            <label className="contributefields" htmlFor="title">Year: </label>
                            <select name="academicYear" id="filterByYear"
                                value={data.academicYear}
                                onChange={handleChange}
                            >
                                <option value="">Choose Academic Year</option>
                                {
                                    years.map((year) => {
                                        return <option value={year} key={year}>{year}</option>
                                    })
                                }
                            </select> <br />

                            <label className="contributefields" htmlFor="title">Branch: </label>
                            <select name="mainpage-branch-filter" id="filterByBranch">
                                <option value="">Choose Branch</option>
                                {
                                    branches.map((branch) => {
                                        return <option value={branch.branch} key={branch._id}>{branch.branch}</option>
                                    })
                                }
                            </select> <br />

                            <label className="contributefields" htmlFor="title">Courses: </label>
                            <select name="mainpage-course-filter" id="filterByCourse">
                                <option value="">Choose Course</option>
                                {
                                    courses.map((course) => {
                                        return <option value={course.course} key={course._id}>{course.course}</option>
                                    })
                                }
                            </select> <br />

                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            /> <br />
                            <button type="submit">Submit</button>
                        </>
                    }
                </form>
            </div>
        </div>
    );
}
