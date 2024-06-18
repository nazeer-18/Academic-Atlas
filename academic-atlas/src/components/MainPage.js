import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ResultItem from './ResultItem';
import '../styles/MainPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faSliders } from '@fortawesome/free-solid-svg-icons';
import resourceService from '../services/resourceService';
import trackService from '../services/trackService';


export default function MainPage() {
    const location = useLocation();
    const [value, setValue] = useState(new URLSearchParams(location.search).get('value'));
    const [examPapers, setExamPapers] = useState([{}]);
    const [branches, setBranches] = useState([]);
    const [courses, setCourses] = useState([]);
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i >= 2021; i--) {
        years.push(i + "-" + (i + 1));
    }

    useEffect(() => {
        setValue(new URLSearchParams(location.search).get('value'));
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
    }, [location])

    const handleSearch = async () => {
        try {
            const academicYear = document.getElementById('filterByYear').value;
            const branch = document.getElementById('filterByBranch').value;
            const course = document.getElementById('filterByCourse').value;
            const response = await resourceService.getExam(academicYear, branch, course)
            console.log(response.data)
            setExamPapers(response.data.examPapers);
        }
        catch (err) {
            alert(err);
        }
    }
    const clearFilters = () => {
        document.getElementById('filterByYear').value = "";
        document.getElementById('filterByBranch').value = "";
        document.getElementById('filterByCourse').value = "";
        handleSearch();
    }
    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line

    }, [])

    return (
        <div className="mainpage">

            <div className="main-query">
                <div className="mainpage-heading">
                    <FontAwesomeIcon icon={faFileLines} /> {value}
                </div>
                <div className="mainpage-filter-txt">
                    <FontAwesomeIcon icon={faSliders} /> Filters
                </div>
                <div className="filter-group">

                    <div className="mainpage-filters-container">
                        <div className="mainpage-year mainpage-filter-item">
                            <div className="filter-container">
                                <div className="filter-label">
                                    Academic Year
                                </div>
                                <div className="filter-choice">
                                    <select name="mainpage-years-filter" id="filterByYear">
                                        <option value="">Choose Academic Year</option>
                                        {
                                            years.map((year) => {
                                                return <option value={year} key={year}>{year}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mainpage-branch mainpage-filter-item">
                            <div className="filter-container">
                                <div className="filter-label">
                                    Branch
                                </div>
                                <div className="filter-choice">
                                    <select name="mainpage-branch-filter" id="filterByBranch">
                                        <option value="">Choose Branch</option>
                                        {
                                            branches.map((branch) => {
                                                return <option value={branch.branch} key={branch._id}>{branch.branch}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mainpage-course mainpage-filter-item">
                            <div className="filter-container">
                                <div className="filter-label">
                                    Course
                                </div>
                                <div className="filter-choice">
                                    <select name="mainpage-course-filter" id="filterByCourse">
                                        <option value="">Choose Course</option>
                                        {
                                            courses.map((course) => {
                                                return <option value={course.course} key={course._id}>{course.course}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainpage-apply-btn">
                        <button onClick={clearFilters}>
                            Clear All
                        </button>
                        <button
                            onClick={handleSearch}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            <div className="mainpage-results">
                <div className="mainpage-results-txt">
                    Results
                </div>
                <div className="mainpage-result-container">
                    <div className="result-container">
                        {
                            examPapers.map((examPaper, index) => {
                                return <ResultItem key={examPaper._id} examPaper={examPaper} />
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
