import React from 'react'
import  '../styles/HomePage.css'
import landingIcon from '../assets/landingPageIcon.svg'

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="home-greeting">
                <div className="greeting-msg">
                    <div className="main-greeting"> <span className="dancing-txt"> Hi</span> <span className="atlas-txt">User  name,</span></div> <br />
                    <div className="add-greeting"> <span className="dancing-txt dive">Dive</span>  into a world of Resources tailored for your Academic Journey</div> <br />
                    <div className="other-txt">Unlock a world of knowledge and cultivate a thriving academic community with Academic Atlas. </div>  <br />
                    <div className="other-txt">Explore invaluable resources curated by your peers, gain insights from their projects and research, and contribute your own work to empower future generations of learners.  </div> <br />
                </div>
                <div className="greeting-img">
                    <img src={landingIcon} alt="greeting" />
                </div>
            </div>
            <div className="home-content">
                <div className="home-item">Mid Sem Papers</div>
                <div className="home-item">End Sem Papers</div>
                <div className="home-item">Projects</div>
                <div className="home-item">Research Papers</div>
                <div className="home-item">Courses</div>
            </div>
        </div>
    )
}
