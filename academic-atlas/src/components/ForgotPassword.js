import React from 'react';
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';
export default function ForgotPassword(){
    return (
        <div className="forgot-password-page">
            <div className="forgot-password-title">
                Forgot Password
            </div>
            <div className="forgot-password-form">
                <form action="">
                    <div className="forgot-password-form-component">
                        <label className="atlas-font" htmlFor="">College Email</label> <br />
                        <input className="atlas-input" type="email" name="email" id="email" placeholder='Enter your email' />
                    </div>
                    <div className="forgot-password-adds a">
                    Remember your password ?<Link to="/login" className="text-red-merry">Login</Link>
                    </div>
                    <div className="forgot-password-btn">
                        <button className='atlas-btn' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
