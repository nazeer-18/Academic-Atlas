import React from "react";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";
import '../styles/DeveloperItem.css'

export default function DeveloperItem(props) {
    // const { developer } = props;
    // const { developerName, imageurl, instaId, linkedInId, mailId } = developer;

    return (
        <>
            <p align="center">
                <a href="https://github.com/nazeer-18/Academic-Atlas/graphs/contributors" target="_blank" rel="noopener noreferrer">
                    <img src="https://contrib.rocks/image?repo=nazeer-18/Academic-Atlas" />
                </a>
            </p>
                {/* <div>
                    <div className="developer-card">
                        <div className="image-placeholder">
                            <img src={imageurl} alt="developer" className="developer-image" />
                        </div>
                        <h3>{developerName}</h3>
                        <div className="social-icons">
                            <a href={`mailto:${mailId}`} className="icon"><SiGmail /></a>
                            <a target="_blank" rel="noopener noreferrer" href={instaId} className="icon"><GrInstagram /></a>
                            <a target="_blank" rel="noopener noreferrer" href={linkedInId} className="icon"><GrLinkedin /></a>
                        </div>
                    </div>
                </div> */}
            </>
            );
}
