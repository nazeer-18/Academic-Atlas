import React from 'react';
import '../styles/ContactUs.css';
import { GrSend } from "react-icons/gr";

export default function ContactUs() {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            
            <div className="contact-card">
                <h2>Have any Queries/suggestions?</h2>
                <p>Please feel free to reach out to us at:</p>
                <a href="mailto:academicatlas.ase@gmail.com" className="contact-email">academicatlas.ase@gmail.com</a>
                <a href="mailto:academicatlas.ase@gmail.com" className="contact-button"><GrSend /></a>
            </div>
        </div>
    );
}
