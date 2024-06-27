import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/logo.jpg';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faFileLines, faDiagramProject, faPlus, faAnglesLeft, faUser, faSignOutAlt, faUserEdit, faKey, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../contexts/userContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser, setLogged, logged } = useUser();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [hideButtons, setHideButtons] = useState(false);
    useEffect(() => {
        if (!logged) {
            setHideButtons(true);
        } else {
            setHideButtons(false);
        }
    })
    const sideNavRef = useRef(null);
    const profileRef = useRef(null);

    const handleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
        setIsProfileOpen(false);
    }

    const handleProfile = () => {
        if (user.email !== '') {
            setIsProfileOpen(!isProfileOpen);
            setIsSideNavOpen(false);
        }
    }

    const handleLogout = () => {
        setLogged(false);
        setUser({ email: '', name: '', role: '' });
        localStorage.removeItem('atlasToken');
        sessionStorage.removeItem('atlasToken');
        navigate('/login')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target) &&
                !event.target.closest('.hamburger')) {
                setIsSideNavOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target) &&
                !event.target.closest('.user-icon')) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="nav-page">
            {
                !hideButtons &&

                <div className="side-nav">
                    <div className="hamburger" onClick={handleSideNav}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <div className={`hidden-side-nav ${isSideNavOpen ? 'show-side-nav' : ''}`} ref={sideNavRef}>
                        <div className="sidenav-head" onClick={handleSideNav}>
                            <FontAwesomeIcon icon={faAnglesLeft} />  Go Back
                        </div>
                        <div className="sidenav-content">
                            <Link to="/" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faHouse} />Home
                                </div>
                            </Link>
                            <Link to="/main?value=Mid Sem Papers" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faFileLines} />Midsem Papers
                                </div>
                            </Link>
                            <Link to="/main?value=End Sem Papers" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faFileLines} />Endsem Papers
                                </div>
                            </Link>
                            <Link to="/main?value=Projects" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faDiagramProject} />Projects
                                </div>
                            </Link>
                            <Link to="/main?value=Research papers" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faFileLines} />Research Papers
                                </div>
                            </Link>
                            <Link to="/contribute" onClick={handleSideNav}>
                                <div className="sidenav-item">
                                    <FontAwesomeIcon icon={faPlus} />Contribute Resource
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            }
            <div className="navbar-header">
                <Link to="/">
                    <img src={logoImage} alt="logo" />
                    Academic Atlas
                </Link>
            </div>
            {
                !hideButtons &&
                <div className="user-icon" onClick={handleProfile}>
                    <FontAwesomeIcon icon={faUser} />
                    <div className={`hidden-profile ${isProfileOpen ? 'show-profile' : ''}`} ref={profileRef}>
                        <div className="profile-content">
                            <Link to="/viewProfile" onClick={handleProfile}>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon={faUserEdit} /> View Profile
                                </div>
                            </Link>
                            <Link to="/myContributions" onClick={handleProfile}>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon={faHandsHelping} /> My Contributions
                                </div>
                            </Link>
                            <Link to="/updatePassword" onClick={handleProfile}>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon={faKey} /> Change Password
                                </div>
                            </Link>
                            <Link to="/feedback" onClick={handleProfile}>
                                <div className="profile-item">
                                    <FontAwesomeIcon icon={faCommentDots} /> Feedback
                                </div>
                            </Link>
                            <div className="profile-item" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}