import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultItem from './ResultItem';
import '../styles/MainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faSliders } from '@fortawesome/free-solid-svg-icons';
import { IoClose } from "react-icons/io5";
import resourceService from '../services/resourceService';
import trackService from '../services/trackService';
import { useUser } from '../contexts/userContext';

export default function MainPage() {
    const { user } = useUser();
    const location = useLocation();
    const [value, setValue] = useState(new URLSearchParams(location.search).get('value'));
    const [type, setType] = useState(new URLSearchParams(location.search).get('type'));
    const [showYear,setShowYear] = useState(true);
    const [showBranch,setShowBranch] = useState(true);
    const [showCourse,setShowCourse] = useState(true);
    const [results, setResults] = useState([{}]);
    const [branches, setBranches] = useState([]);
    const [courses, setCourses] = useState([]);
    const [popUpIsOpen, setPopUpIsOpen] = useState(false);
    const [popUpTitle, setpopUpTitle] = useState('Title')
    const [summary, setSummary] = useState('Backend Error!!')
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i >= 2021; i--) {
        years.push(i + "-" + (i + 1));
    }
    const updateResults = async () => {
        try {
            const academicYear = document.getElementById('filterByYear').value;
            const branch = document.getElementById('filterByBranch').value;
            const course = document.getElementById('filterByCourse').value;
            setShowYear(academicYear === "" ? true : false);
            setShowBranch(branch === "" ? true : false);
            setShowCourse(course === "" ? true : false);
            const category = value === "Mid Sem Papers" ? "midSem" : value === "End Sem Papers" ? "endSem" : value === "Projects" ? "project" : "research";
            const path = (category === "midSem" || category === "endSem") ? resourceService.getExam : resourceService.getCapstone;
            const response = await path(academicYear, branch, course, category, (type === 'manage' ?  user.email:''));
            setResults(response.data.results);
        } catch (err) {
            alert(err);
        }
    };

    const showPopUp = (t,s) => {
        // console.log("main call");
        // console.log(s);
        setpopUpTitle("summary for "+t);
        if(!s)
            setSummary("Please wait, summary is being generated")
        else
            setSummary(s);
        setPopUpIsOpen(true);
    }

    
    const closePopup = () => setPopUpIsOpen(false);

    useEffect(() => {
        setValue(new URLSearchParams(location.search).get('value'));
        setType(new URLSearchParams(location.search).get('type'));
        const getTracks = async () => {
            try {
                const response = await trackService.getBranches();
                setBranches(response.data.branches);
                const response2 = await trackService.getCourses();
                const sortedCourses = response2.data.courses.sort((a, b) => {
                    const nameA = a.course.substring(a.course.indexOf(' ') + 1);
                    const nameB = b.course.substring(b.course.indexOf(' ') + 1);
                    return nameA.localeCompare(nameB);
                });
                setCourses(sortedCourses);
            } catch (err) {
                console.log(err);
            }
        };
        getTracks();
        updateResults();
        clearFilters();
    }, [location]);

    useEffect(()=>{
        updateResults();
    })

    const clearFilters = () => {
        document.getElementById('filterByYear').value = "";
        document.getElementById('filterByBranch').value = "";
        document.getElementById('filterByCourse').value = "";
        updateResults();
    };

    useEffect(() => {
        updateResults();
        // eslint-disable-next-line
    },[])

    return (
        <div className="mainpage">
            {popUpIsOpen &&
                <div className="popUpLayout" onClick={closePopup} >
                    <div className="popUpBox" onClick={(e) => e.stopPropagation()} >
                        <button onClick={closePopup} className="popUpClose">
                            <IoClose/>
                        </button>
                        <h2 className="popUpTitle">{popUpTitle}</h2>
                        <p className="popUpSummary">{summary}</p>
                    </div>
                </div>
            }
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
                                        {years.map((year) => {
                                            return <option value={year} key={year}>{year}</option>;
                                        })}
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
                                        {branches.map((branch) => {
                                            return <option value={branch.branch} key={branch._id}>{branch.branch}</option>;
                                        })}
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
                                        {courses.map((course) => {
                                            return <option value={course.course} key={course._id}>{course.course}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainpage-apply-btn">
                        <button onClick={clearFilters}>
                            Clear All
                        </button>
                        {/* <button onClick={updateResults}>
                            Apply
                        </button> */}
                    </div>
                </div>
            </div>

            <div className="mainpage-results">
                <div className="mainpage-results-txt">
                    Results
                </div>
                <div className="mainpage-result-container">
                    <div className="result-container">
                        {results.length === 0 ? (
                            <div className="no-results">No Results Found</div>
                        ) : (
                            results.map((resultItem, index) => {
                                return <ResultItem key={index} resultItem={resultItem} index={index} type={type} showYear={showYear} showBranch={showBranch} showCourse={showCourse} showPopUp={showPopUp}/>;
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
