import React, { useState, useEffect } from 'react';
import '../styles/ResultItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare, faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import resourceService from '../services/resourceService';

import contributionService from '../services/contributionService';

export default function ResultItem(props) {
    const { resultItem, index } = props;
    const [thumbnail, setThumbnail] = useState(null);
    const { author, academicYear, branch, course, fileUrl, fileId, title, url, category } = resultItem;
    const type = props.type;
    const showYear = props.showYear;
    const showBranch = props.showBranch;
    const showCourse = props.showCourse;
    const capstone = category === "project" || category === "research" ? true : false;
    const reference = capstone ? url : fileUrl;
    const download = capstone ? false : true;
    useEffect(() => {
        const fetchThumbnail = async () => {
            try {
                const response = await resourceService.getThumbnail(fileId);
                setThumbnail(response.data.thumbnailLink);
            } catch (err) {
                console.log(err);
            }
        };
        fetchThumbnail();
    }, [fileId]);

    const handleDownload = async (fileId) => {
        try {
            const fileName = `${academicYear}-${course}-${category}`;
            console.log(fileId, fileName);
            await resourceService.downloadPdf(fileId, fileName);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            const path = (category === "midSem" || category === "endSem") ? resourceService.deleteExam : resourceService.deleteCapstone;
            const response = await path(resultItem._id);
        } catch (err) {
            console.log(err);
        }
        try {
            console.log(author, category, resultItem._id);
            const response = await contributionService.deleteContribution(author, category, resultItem._id);
            const result = response.data;
            if (result.success) {
                alert('Contribution deleted successfully');
            } else {
                alert('Error deleting contribution');
            }
        } catch (error) {
            console.error('Error deleting contribution:', error);
            alert('Error deleting contribution');
        }
    };
    const strippedName = (name) => {
        if (name === undefined) return '';
        const first = name.substring(name.indexOf('.') + 1, name.indexOf('@'));
        const second = first.substring(first.indexOf('.') + 1);
        //return cse21161 from ch.en.u4cse21161
        return second;
    }

    return (
        <div className="result-item-page">
            <div className="result-item-container">
                <span className="result-item-img">
                    {
                        capstone ?
                            <div className='capstone-title'>
                                <span className="result-item-label">Title:</span> &nbsp;
                                <span className="result-item-value">{title}</span> <br />
                            </div>
                            :
                            <img src={thumbnail} alt="result" />
                    }
                    {
                        showYear &&
                        <div className="year-badge">
                            <div>
                                <span className="result-item-label"></span> &nbsp;
                                <span className="result-item-value">{academicYear}</span> <br />
                            </div>
                        </div>
                    }
                    {
                        showBranch &&
                        <div className="branch-badge">
                            <div>
                                <span className="result-item-label"></span> &nbsp;
                                <span className="result-item-value">{branch}</span> <br />
                            </div>
                        </div>
                    }
                </span>
                <div className="hide-result-info show-result-info">
                    <div className="result-ay result-item-detail">
                        {
                            showCourse &&
                            <div>
                                <span className="result-item-label"></span> &nbsp;
                                <span className="result-item-value">{course}</span> <br />
                            </div>
                        }
                    </div>
                    <div>
                        {
                            type === 'results' ?
                                <div className='result-item-btn-container'>
                                    <a href={reference} target="_blank" rel="noreferrer">
                                        <button className="result-item-btn atlas-btn" >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                    </a>
                                    {
                                        download &&
                                        <button className="result-item-btn atlas-btn" onClick={() => handleDownload(fileId)}><FontAwesomeIcon icon={faDownload} /></button>
                                    }
                                </div>
                                :
                                <div className='result-item-btn-container'>
                                    <button className="result-item-btn atlas-btn">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className="result-item-btn atlas-btn" onClick={handleDelete}>
                                        <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                                    </button>
                                </div>
                        }
                        {
                            <div className='author-details'>
                                <span className="result-item-label">By:</span> &nbsp;
                                <span className="result-item-value">{strippedName(author)}</span> <br />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

