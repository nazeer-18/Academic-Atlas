import React, { useState, useEffect } from 'react';
import '../styles/ResultItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import resourceService from '../services/resourceService';

export default function ResultItem(props) {
    const { examPaper, index } = props;
    const [thumbnail, setThumbnail] = useState(null);
    const { author, academicYear, branch, course, category, fileUrl, fileId } = examPaper;

    const showOptions = () => {
        document.querySelector(`#hidden-options-${index}`).classList.toggle('show-options');
    };

    useEffect(() => {
        const fetchThumbnail = async () => {
            try {
                const response = await resourceService.getThumbnail(fileId);
                setThumbnail(response.data.thumbnailLink);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchThumbnail();
    }, [fileId])


    const handleDownload = async (fileId) => {
        try {
            const fileName = academicYear + "-" + course + "-" + category;
            console.log(fileName)
            await resourceService.downloadPdf(fileId, fileName);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="result-item-page">
            <div className="result-item-container">
                <div className="three-dots" title="more-actions">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="result-ellipsis" onClick={showOptions} />
                </div>
                {

                }
                <div id={`hidden-options-${index}`} className="hidden-options">
                    <a href={fileUrl} target="_blank" rel="noreferrer">
                        <div>View</div>
                    </a>
                    <div onClick={() => { handleDownload({ fileId }) }}>Download</div>
                </div>
                {
                    
                }
                <span className="result-item-img">
                    <img src={thumbnail} alt="result" />
                </span>
                <div className="result-ay result-item-detail">
                    <span className="result-item-label"></span> &nbsp;
                    <span className="result-item-value">{academicYear}</span> <br />
                    <span className="result-item-label"></span> &nbsp;
                    <span className="result-item-value">{branch}</span> <br />
                    <span className="result-item-label"></span> &nbsp;
                    <span className="result-item-value">{course}</span> <br />
                    <span className="result-item-label">Publisher:</span> &nbsp;
                    <span className="result-item-value">{author}</span> <br />
                </div>
            </div>
        </div>
    );
}
