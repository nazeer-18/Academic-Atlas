import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faFileLines, faDiagramProject, faPlus, faAnglesLeft, faUser, faAnglesRight, faSignOutAlt, faUserEdit, faKey, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const sideNavRef = useRef(null);
    const profileRef = useRef(null);

    const handleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
        setIsProfileOpen(false);
    }

    const handleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
        setIsSideNavOpen(false);
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
            <div className="navbar-header">
                <Link to="/">
                    <img src={logoImage} alt="logo" />
                    Academic Atlas
                </Link>
            </div>
            <div className="user-icon" onClick={handleProfile}>
                <FontAwesomeIcon icon={faUser} />
                <div className={`hidden-profile ${isProfileOpen ? 'show-profile' : ''}`} ref={profileRef}>
                    <div className="profile-content">
                        <Link to="/view-profile" onClick={handleProfile}>
                            <div className="profile-item">
                                <FontAwesomeIcon icon={faUserEdit} /> View Profile
                            </div>
                        </Link>
                        <Link to="/myContributions" onClick={handleProfile}>
                            <div className="profile-item">
                                <FontAwesomeIcon icon={faHandsHelping} /> My Contributions
                            </div>
                        </Link>
                        <Link to="/change-password" onClick={handleProfile}>
                            <div className="profile-item">
                                <FontAwesomeIcon icon={faKey} /> Change Password
                            </div>
                        </Link>
                        <Link to="/logout" onClick={handleProfile}>
                            <div className="profile-item">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}