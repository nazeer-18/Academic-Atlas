import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faHouse,faFileLines ,faDiagramProject, faPlus,faAnglesLeft} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const handleSideNav = () => {
        const hamburger = document.querySelector('.hamburger');
        const hiddenSideNav = document.querySelector('.hidden-side-nav');
        hiddenSideNav.classList.toggle('show-side-nav');
    }
    return (
        <div className="nav-page">
            <div className="side-nav">
                <div className="hamburger" onClick={handleSideNav}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="hidden-side-nav">
                    <div className="sidenav-head" onClick={handleSideNav}>
                        <FontAwesomeIcon icon={faAnglesLeft}  />  Go Back
                    </div>
                    <div className="sidenav-content">
                        <Link>
                            <div className="sidenav-item">
                                <FontAwesomeIcon icon={faHouse} />Home
                            </div>
                        </Link> 
                        <Link to="/midsem">
                            <div className="sidenav-item">
                                <FontAwesomeIcon icon={faFileLines} />Midsem Papers
                            </div>
                        </Link> 
                        <Link to="/endsem">
                            <div className="sidenav-item">
                                <FontAwesomeIcon icon={faFileLines} />Endsem Papers
                            </div>
                        </Link>  
                        <Link to="/project">
                            <div className="sidenav-item">
                                <FontAwesomeIcon icon={faDiagramProject} />Projects
                            </div>
                        </Link> 
                        <Link to="/research">
                            <div className="sidenav-item">
                                <FontAwesomeIcon icon={faFileLines} />Research Papers
                            </div>
                        </Link>
                        <Link to="/contribute">
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
        </div>
    );
}