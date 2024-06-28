import React, { useState, useEffect } from 'react';
import '../styles/ResultItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import resourceService from '../services/resourceService';

import contributionService from '../services/contributionService';

export default function ResultItem(props) {
    const { resultItem, index } = props;
    const [thumbnail, setThumbnail] = useState(null);
    const { author, academicYear, branch, course, fileUrl, fileId ,title,url,category} = resultItem;

    const showOptions = () => {
        document.querySelector(`#hidden-options-${index}`).classList.toggle('show-options');
    };

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
            console.log(fileName);
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
            console.log(author, category, resultItem._id)
            const response = await contributionService.deleteContribution(author, category,resultItem._id);
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

    return (
        <div className="result-item-page">
            <div className="result-item-container">
                <span className="result-item-img">
                    <img src={thumbnail} alt="result" />
                </span>
                <div className="hide-result-info show-result-info">
                    <div className="three-dots" title="more-actions">
                        <FontAwesomeIcon icon={faEllipsisVertical} className="result-ellipsis" onClick={showOptions} />
                    </div>
                    <div id={`hidden-options-${index}`} className="hidden-options">
                        <a href={fileUrl} target="_blank" rel="noreferrer">
                            <div>View</div>
                        </a>
                        <div onClick={() => { handleDownload(fileId) }}>Download</div>
                        <div onClick={handleDelete} className="delete-btn">
                            Delete
                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
                        </div>
                    </div>
                    <div className="result-ay result-item-detail">
                        <span className="result-item-label"></span> &nbsp;
                        <span className="result-item-value">{academicYear}</span> <br />
                        <span className="result-item-label"></span> &nbsp;
                        <span className="result-item-value">{branch}</span> <br />
                        <span className="result-item-label"></span> &nbsp;
                        <span className="result-item-value">{course}</span> <br />
                        <span className="result-item-label">By:</span> &nbsp;
                        <span className="result-item-value">{author}</span> <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

