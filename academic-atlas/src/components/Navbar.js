import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logoImage from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faHouse,faFileLines ,faDiagramProject, faPlus,faAnglesLeft,faUser,faAnglesRight} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const handleSideNav = () => {
        const hiddenSideNav = document.querySelector('.hidden-side-nav');
        hiddenSideNav.classList.toggle('show-side-nav');
    }
    const handleProfile = () =>{
        const hiddenProfile = document.querySelector('.hidden-profile');
        hiddenProfile.classList.toggle('show-profile');
    }
    useEffect(()=>{
        console.log('Navbar rendered');
    })
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
            <div className="user-icon">
                <FontAwesomeIcon icon={faUser} onClick={handleProfile} />
                <div className="hidden-profile">
                <div className="profile-head" onClick={handleProfile}>
                        Go Back <FontAwesomeIcon icon={faAnglesRight}  />  
                    </div>
                    <div className="">
                        TBD
                    </div>
                </div>
            </div>
        </div>
    );
}