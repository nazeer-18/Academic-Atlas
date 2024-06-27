import React from 'react';
import '../styles/Curriculum.css';
import { VscGoToSearch } from "react-icons/vsc";

export default function Curriculum() {
    return (
        <div className="curriculum-page">
            <h1>Curriculum</h1>
            <div className="curriculum-card">
                <p>Want to explore regulations and syllabus of respective branches and courses? Click below</p>
                <a href="https://www.amrita.edu/academics/curriculum/" target='_new' className="curriculum-button">Visit
                    <VscGoToSearch />
                </a>
            </div>
        </div>
    );
}
