import React, { useState } from "react";
import "../styles/SignupAcnt.css";
import SignUpAcntImg from '../assets/SignUpAcntIcon.svg'

export default function SignupAcnt() {
    const [data, setData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    })
    const [success, setSuccess] = useState(false)
    const handleRegister = (e) => {
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity()) {
            e.preventDefault();
            form.reportValidity();
        } else {
            console.log(data);
        }
    }
    return (
        <div>

            <div className="signup-acnt-page">
                <div className="signup-acnt-img">
                    <img src={SignUpAcntImg} alt="SignUpAcnt" />
                </div>
                <div className="signup-acnt-content">

                    <div className="signup-acnt-title atlas-title">
                        Signup
                    </div>
                    <div className="signup-acnt-form">
                        <form action="" id="atlas-form">
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="email">Email</label> <br />
                                <input
                                    className="atlas-input"
                                    type="email"
                                    disabled
                                    id="email"
                                    name="email" />
                            </div>
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="name">Name</label> <br />
                                <input
                                    className="atlas-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder="Enter your name" />
                            </div>
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="password">Password</label> <br />
                                <input
                                    className="atlas-input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    placeholder="Enter your password" />
                            </div>
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="confirm-password">Confirm Password</label> <br />
                                <input
                                    className="atlas-input"
                                    type="password"
                                    id="confirm-password"
                                    name="confirm-password"
                                    required
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    placeholder="Confirm your password" />
                            </div>
                            <div className="signup-acnt-terms text-red-merry">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    name="terms" />
                                <label htmlFor="terms">I agree to the terms and conditions</label>
                            </div>
                            <div className="signup-acnt-btn">
                                <button
                                    className="atlas-btn"
                                    onClick={handleRegister}
                                    value="submit"
                                    type="submit">
                                    Create account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}