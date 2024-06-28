import React, { useState, useEffect } from 'react';
import resourceService from '../services/resourceService';
import '../styles/ContributePage.css';
import trackService from '../services/trackService';
import { useUser } from '../contexts/userContext';

export default function Contribute() {
    const { user } = useUser();
    useEffect(() => {
        setData({ ...data, author: user.email });
        setEmailValid(validateEmail(user.email));
    }, [user])
    const [data, setData] = useState({
        title: '',
        url: '',
        category: '',
        academicYear: '',
        branch: '',
        course: '',
        pdfFile: null,
        author: user.email
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [branches, setBranches] = useState([]);
    const [emailValid, setEmailValid] = useState(false);
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

    const validateEmail = (email) => {
        const regex = /@ch\.amrita\.edu$|@ch\.students\.amrita\.edu$/;
        return regex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById('contribution-form');
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('category', data.category);
            formData.append('academicYear', data.academicYear);
            formData.append('branch', data.branch);
            formData.append('course', data.course);
            formData.append('url', data.url);
            formData.append('pdfFile', data.pdfFile);
            formData.append('author', data.author);
            try {
                const method = choice === "capstone" ? resourceService.addCapstone : resourceService.addExam;
                const res = await method(formData);
                setMessage(res.data.message);
                setSuccess(res.data.success)
                if (res.data.success) {
                    setData({
                        title: '',
                        url: '',
                        category: '',
                        academicYear: '',
                        branch: '',
                        course: '',
                        pdfFile: null,
                    });
                }
            } catch (err) {
                console.log(err);
                setMessage('An error occurred while adding the resource');
                setSuccess(false);
            }
            finally {
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }
        }
    };

    return (
        <div className="contributepage">
            {
                emailValid &&
                <div className="contribute-container">
                    <div className="contribute-header">
                        Contribute Resource
                    </div>
                    <div className="contribute-content filter-choice">
                        <label className='contributequestion' for="typefields">What would you like to contribute today ?</label>
                        <select
                            id="contribution"
                            className="contribution-choice"
                            onChange={(e) => setChoice(e.target.value)}>
                            <option value="">Select Type</option>
                            <option value="capstone">Capstone</option>
                            <option value="exam">Sem papers</option>
                        </select>
                    </div>

                    <form id="contribution-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        {
                            <>
                                <label className="contributefields" htmlFor="title">Year: </label>
                                <select name="academicYear" id="filterByYear" required
                                    value={data.academicYear}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose Academic Year</option>
                                    {
                                        years.map((year) => {
                                            return <option value={year} key={year}>{year}</option>
                                        })
                                    }
                                </select>

                                <label className="contributefields" htmlFor="title">Branch: </label>
                                <select name="branch" className="mainpage-branch-filter" required id="filterByBranch" onChange={handleChange}>
                                    <option value="">Choose Branch</option>
                                    {
                                        branches.map((branch) => {
                                            return <option value={branch.branch} key={branch._id}>{branch.branch}</option>
                                        })
                                    }
                                </select>

                                <label className="contributefields" htmlFor="title">Courses: </label>
                                <select name="course" required className="mainpage-course-filter" id="filterByCourse" onChange={handleChange} >
                                    <option value="">Choose Course</option>
                                    {
                                        courses.map((course) => {
                                            return <option value={course.course} key={course._id}>{course.course}</option>
                                        })
                                    }
                                </select>
                            </>
                        }
                        {

                            choice === 'capstone' &&

                            <>
                                <label className="contributefields" htmlFor="category">Category: </label>
                                <select required name="category" onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    <option value="project">Project</option>
                                    <option value="research">Research</option>
                                </select>
                                <label className="resultfields" htmlFor="title">Title: </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Enter title of your project"
                                    value={data.title}
                                    onChange={handleChange}
                                />

                                <label className="contributefields" htmlFor="title">Link: </label>
                                <input
                                    type="text"
                                    name="url"
                                    required
                                    placeholder="Paste the github url of your project"
                                    value={data.url}
                                    onChange={handleChange}
                                />
                            </>
                        }

                        {

                            choice !== '' && choice !== "capstone" &&
                            <>
                                <label className="contributefields" htmlFor="category">Category: </label>
                                <select required name="category" onChange={handleChange}>
                                    <option value="">Select Category</option>
                                    <option value="midSem">Mid Sem</option>
                                    <option value="endSem">End Sem</option>
                                </select>
                                <input
                                    type="file"
                                    required
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                />
                            </>
                        }
                        {
                            choice !== "" &&
                            <>
                                {
                                    message !== '' &&
                                    <div className={`login-response-msg ${success}`}>
                                        {message}
                                    </div>
                                }
                                <div className='contribution-btn-container'>
                                    <button className="atlas-btn" type="submit">Submit</button>
                                </div>
                            </>
                        }
                    </form>
                </div>
            }
            {
                !emailValid &&
                <div className="contribute-container">
                    <div className="contribute-header">
                        Contribute Resource
                    </div>
                    <div className="contribute-content">
                        <div className="contribute-message">
                            Please login with your Amrita email to contribute resources.
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
