import React from "react";
import { Link } from "react-router-dom";
import { GrInstagram } from "react-icons/gr";
import { SiGmail } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";

export default function DeveloperItem() {
    return (
        <div>
            <div className="developer-card">
                <div className="image-placeholder">Image</div>
                <h3>Developer 4</h3>
                <div className="social-icons">
                    <Link className="icon"><GrInstagram />
                    </Link>
                    <Link className="icon"><SiGmail /></Link>
                    <Link className="icon"><GrLinkedin /></Link>
                </div>
            </div>
        </div>
    );
}
