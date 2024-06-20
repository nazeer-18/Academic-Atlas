import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import '../styles/ResultItem.css';
import PDFThumbnail from './PDFThumbnail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function ResultItem(props) {
    const { examPaper } = props;
    const { author, academicYear, branch, course, pdfFile } = examPaper;
    const [pdfData, setPdfData] = useState(null);
    const [pdfLoaded, setPdfLoaded] = useState(false);

    useEffect(() => {
        if (pdfFile && pdfFile.data) {
            setPdfLoaded(true);
        } else {
            console.error('pdfFile.data is undefined or null');
        }
    }, [pdfFile]);

    useEffect(() => {
        if (pdfLoaded) {
            try {
                const buffer = Buffer.from(pdfFile.data);
                const base64String = buffer.toString('base64');
                setPdfData(base64String);
            } catch (err) {
                console.error('Error converting PDF data to base64:', err);
            }
        }
    }, [pdfLoaded, pdfFile.data]);

    const showOptions = () => {
        document.querySelector('.hidden-options').classList.toggle('show-options');
    };

    return (
        <div className="result-item-page">
            <div className="result-item-container">
                <div className="three-dots" title="more-actions">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="result-ellipsis" onClick={showOptions} />
                </div>
                <div className="hidden-options">
                    <div>View</div>
                    <div>Download</div>
                </div>
                <span className="result-item-img">
                    {pdfLoaded && pdfData ? <PDFThumbnail base64String={pdfData} /> : <div className="result-item-img-placeholder">PDF</div>}
                </span>
                <div className="result-ay result-item-detail">
                    <span className="result-item-label">Academic Year</span> &nbsp;
                    <span className="result-item-value">{academicYear}</span> <br />
                    <span className="result-item-label">Branch</span> &nbsp;
                    <span className="result-item-value">{branch}</span> <br />
                    <span className="result-item-label">Course</span> &nbsp;
                    <span className="result-item-value">{course}</span> <br />
                    <span className="result-item-label">Author</span> &nbsp;
                    <span className="result-item-value">{author}</span> <br />
                    <span className="result-item-label">PDF</span> &nbsp;
                </div>
            </div>
        </div>
    );
}
