import React from 'react'
import '../styles/ResultItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export default function ResultItem() {
    const showOptions = () => {
        document.querySelector('.hidden-options').classList.toggle('show-options');
    }
    return (
        <div clasName="result-item-page">
            <div className="result-item-container">
                <div className="three-dots" title="more-actions">
                    <FontAwesomeIcon icon={faEllipsisVertical} className="result-ellipsis" onClick={showOptions} />
                </div>
                <div className="hidden-options">
                    <div>View</div>
                    <div>Download</div>
                </div>
                <span className="result-item-img">
                    <img src="https://imgs.search.brave.com/BMuYABP7oP4l8HymmSOQIH30nF_YQMtJm-y7Bz-vc6Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA" alt="result" />
                </span>
                <div className="result-ay result-item-detail">
                    <p>2023-24</p>
                    <p>data structures</p>
                    <p>John Doe</p>
                </div>
            </div>
        </div>
    )
}
