import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ResultItem from './ResultItem';
import '../styles/MainPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faSliders } from '@fortawesome/free-solid-svg-icons';


export default function MainPage() {
    const location = useLocation();
    const [value, setValue] = useState(new URLSearchParams(location.search).get('value'));
    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i >= 2021; i--) {
        years.push(i + "-" + (i + 1));
    }

    useEffect(() => {
        setValue(new URLSearchParams(location.search).get('value'));
        // eslint-disable-next-line
    }, [location])

    const clearFilters = () => {
        document.getElementById('filterByYear').value = "";
        document.getElementById('filterByBranch').value = "";
        document.getElementById('filterByCourse').value = "";
    }

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
                                        <option value="CSE">CSE</option>
                                        <option value="ECE">ECE</option>
                                        <option value="ME">ME</option>
                                        <option value="CE">CE</option>
                                        <option value="EE">EE</option>
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
                                        <option value="B.Tech">Data structures & Algorithms</option>
                                        <option value="M.Tech">19cse 318 principles of Artificial Intelligence</option>
                                        <option value="Phd">Phd</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainpage-apply-btn">
                        <button onClick={clearFilters}>
                            Clear All
                        </button>
                        <button>
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
                        <ResultItem /> 
                    </div>
                </div>
            </div>

        </div>
    )
}
