import React from 'react'
import '../styles/SignupMail.css'
import SignUpMailIconImg from '../assets/SignUpMailIcon.svg'

export default function SignupMail() {
    return (
        <div className="signupmail-page">
            <div className="signupmail-img">
                <img src={SignUpMailIconImg} alt="signupmail" />
            </div>
            <div className="signupmail-content">
            <div className="atlas-title signupmail-title">
                Signup
            </div>
            <div className="signupmail-form">
                <form action="">
                    <div className="signupmail-form-component">
                        <label className="atlas-font" htmlFor="email">College Email</label> <br />
                        <input className="atlas-input" type="email" id="email" name="email" placeholder="Enter your college email" />
                    </div>
                    <div>
                        By continuing, you agree to our <span className="text-red-merry">Terms of Service</span> and <span className="text-red-merry">Privacy Policy</span>
                    </div>
                    <div className="signupmail-btn">
                        <button className="atlas-btn" type="submit">Continue with email</button>
                    </div>
                </form>
            </div>

            </div>
            
        </div>
    )
}
