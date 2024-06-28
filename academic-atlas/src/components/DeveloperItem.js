import React from "react";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";

export default function DeveloperItem(props) {
    const { developer } = props;
    const { developerName, imageurl, instaId, linkedInId, mailId } = developer;
    
    return (
        <div>
            <div className="developer-card">
                    
                <div className="image-placeholder">image
                   
                        <img src={imageurl} alt="developer" className="developer-image" />
                   
                </div>
                <h3>{developerName}</h3>
                <div className="social-icons">
                    <a href={`mailto:${mailId}`} className="icon"><SiGmail /></a>
                    <a target="_blank" rel="noopener noreferrer" href={instaId} className="icon"><GrInstagram /></a>
                    <a target="_blank" rel="noopener noreferrer" href={linkedInId} className="icon"><GrLinkedin /></a>
                </div>
            </div>
        </div>
    );
}
