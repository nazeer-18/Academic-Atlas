import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/AVVlogo.png'; // Make sure to import your logo image

export default function Footer() {
    return (
        <div className="footer-page">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-copyright">©2024 Academic Atlas</div>
                <div className="footer-links">
                    <div className="footer-link">
                        <a href="/about-us">About Us</a>
                    </div>
                    <div className="footer-link">
                        <a href="/curriculum">Curriculum</a>
                    </div>
                    <div className="footer-link">
                        <a href="/faq">FAQ</a>
                    </div>
                    <div className="footer-link">
                        <a href="/contact-support">Contact/Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
