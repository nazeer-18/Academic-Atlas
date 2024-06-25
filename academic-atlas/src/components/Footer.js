import React from 'react';
import {Link} from 'react-router-dom'
import '../styles/Footer.css';
import logo from '../assets/AVVlogo.png'; // Make sure to import your logo image

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footer-copyright">
                ©2024 Academic Atlas
            </div>
            <div className="footer-links">
                <div className="footer-link">
                    <Link to="/aboutus">About Us</Link>
                </div>
                <div className="footer-link">
                    <a href="/ContactUs">Contact Us</a>
                </div>
                <div className="footer-link">
                    <a href="/curriculum">Curriculum</a>
                </div>
                <div className="footer-link">
                    <Link to="/faq">FAQ</Link>
                </div>                
            </div>
        </div>
    );
}
