import React from 'react';
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';
import Forgot2pwdImg from '../assets/OTP.svg';
export default function ForgotPassword(){
    return (
        <div className="forgot-password-page">
            <div className="Forgotpwd-img">
                <img src={Forgot2pwdImg} alt="Forgot2pwd" />
            </div>
            <div className="Forgotpwd-content">
            <div className="forgot-password-title">
                Forgot Password
            </div>
            <div className="forgot-password-form">
                <form action="">
                    <div className="forgot-password-form-component">
                        <label className="atlas-font" htmlFor="">Please enter the code sent to your email</label> <br />
                        <input className="atlas-input" type="email" name="email" id="email" placeholder='Enter the code' />
                    </div>
                    <div className="forgot-password-adds a">
                    Didn't receive the code?<Link to="/forgot2pwd" className="text-red-merry">Resend</Link>
                    </div>
                    <div className="forgot-password-btn">
                        <button className='atlas-btn' type="submit">Submit</button>
                    </div>
                </form>
            </div>
            </div>
            
        </div>
    )
}
