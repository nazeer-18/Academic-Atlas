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
                    <Link to="/about-us">About Us</Link>
                </div>
                <div className="footer-link">
                    <Link to="/curriculum">Curriculum</Link>
                </div>
                <div className="footer-link">
                    <Link to="/faq">FAQ</Link>
                </div>
                <div className="footer-link">
                    <Link to="/ContactUs">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}
