import React, { useState,useEffect } from 'react'
import '../styles/MainPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faSliders } from '@fortawesome/free-solid-svg-icons';
import MainPageIcon from '../assets/MainPageIcon.svg'


export default function MainPage() {
    const [query, setQuery] = useState(new URLSearchParams(window.location.search));
    const [value, setValue] = useState(query.get('value'));
    useEffect(()=>{
        setQuery(new URLSearchParams(window.location.search));
        setValue(query.get('value'));
    },[query])
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
                                    2023-2024
                                </div>
                            </div>
                        </div>
                        <div className="mainpage-branch mainpage-filter-item">
                            <div className="filter-container">
                                <div className="filter-label">
                                    Branch
                                </div>
                                <div className="filter-choice">
                                    CSE
                                </div>
                            </div>
                        </div>
                        <div className="mainpage-course mainpage-filter-item">
                            <div className="filter-container">
                                <div className="filter-label">
                                    Course
                                </div>
                                <div className="filter-choice">
                                    Computer Networks
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainpage-apply-btn">
                        <button>Apply</button>
                    </div>
                </div>
            </div>

            <div className="mainpage-results">
                <div className="mainpage-results-txt">
                    Results
                </div>  
                <div className="mainpage-result-container">
                    <div className="result-img">
                        <img src={MainPageIcon} alt="MainPageIcon" />
                    </div>
                    <div className="result-container">
                        result item
                    </div>
                </div>
            </div>

        </div>
    )
}
