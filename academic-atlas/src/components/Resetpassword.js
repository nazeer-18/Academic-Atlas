import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Resetpassword.css";
export default function Resetpassword() {
    return (
        <div className="Resetpassword-page">
            <div className="Resetpassword-title">
                <h1>Reset your password</h1>
            </div>
            <div className="Resetpassword-form">
                <form action="">
                    
                    <div className="Resetpassword-form-component">
                        <label className="atlas-font" htmlFor="password">Password</label> <br />
                        <input className="atlas-input" type="password" id="password" name="password" placeholder="New password"/>
                    </div>
                    <div className="Resetpassword-form-component">
                        <label className="atlas-font" htmlFor="confirm-password">Confirm Password</label> <br />
                        <input  className="atlas-input"type="password" id="repeat-password" name="repeat-password" placeholder="Confirm password"/>
                    </div>
                    
                    <div className="rememberpassword-reset atlas-font">
                    Remember your password? <Link to="/Login" className="text-red-merry">Login</Link>
                    </div>
                    <div className="Resetpassword-btn">
                        <button className="atlas-btn" type="submit">Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    );
}