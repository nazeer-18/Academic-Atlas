import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/HomePage.css'
import landingIcon from '../assets/landingPageIcon.svg'
import { useUser } from '../contexts/userContext'

export default function HomePage() {
    const { user, setUser } = useUser();
    useEffect(() => {
        setUser(user)
    }, [user])
    return (
        <div className="home-page">
            <div className="home-greeting">
                <div className="greeting-msg">
                    <div className="main-greeting"> <span className="dancing-txt"> Hi </span> <span className="atlas-txt">{user.userName},</span></div> <br />
                    <div className="add-greeting"> <span className="dancing-txt dive">Dive</span>  into a world of Resources tailored for your Academic Journey</div> <br />
                    <div className="other-txt">Unlock a world of knowledge and cultivate a thriving academic community with Academic Atlas. </div>  <br />
                    <div className="other-txt">Explore invaluable resources curated by your peers, gain insights from their projects and research, and contribute your own work to empower future generations of learners.  </div> <br />
                </div>
                <div className="greeting-img">
                    <img src={landingIcon} alt="greeting" />
                </div>
            </div>
            <div className="home-content">
                <Link to="/main?value=Mid Sem Papers?type=results">
                    <div className="home-item">Mid Sem Papers</div>
                </Link>
                <Link to="/main?value=End Sem Papers?type=results">
                    <div className="home-item">End Sem Papers</div>
                </Link>
                <Link to="/main?value=Projects?type=results">
                    <div className="home-item">Projects</div>
                </Link>
                <Link to="/main?value=Research Papers?type=results">
                    <div className="home-item">Research Papers</div>
                </Link>
                {/* <Link to="courses">
                    <div className="home-item">Courses</div>
                </Link> */}
            </div>
        </div>
    )
}
