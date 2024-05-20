import React from "react";
import "../styles/Signup.css";
export default function Signup() {
    return (
        <div className="signup-page">
            <div className="signup-title">
                <h1>Signup</h1>
            </div>
            <div className="signup-form">
                <form action="">
                    <div className="signup-form-component">
                        <label className="atlas-label" htmlFor="name">Name</label> <br />
                        <input className="atlas-input" type="text" id="name" name="name" placeholder="Enter your name"/>
                    </div>
                    <div className="signup-form-component">
                        <label className="atlas-label" htmlFor="email">Email</label> <br />
                        <input  className="atlas-input" type="email" id="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="signup-form-component">
                        <label className="atlas-label" htmlFor="password">Password</label> <br />
                        <input className="atlas-input" type="password" id="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <div className="signup-form-component">
                        <label className="atlas-label" htmlFor="confirm-password">Confirm Password</label> <br />
                        <input  className="atlas-input"type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password"/>
                    </div>
                    <div className="signup-terms text-red-merry">
                        <input type="checkbox" id="terms" name="terms"/>
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                    </div>
                    <div className="signup-btn">
                        <button className="atlas-btn" type="submit">Create account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}