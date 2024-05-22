import React from 'react';
import '../styles/Forgot2pwd.css';
import { Link } from 'react-router-dom';
export default function Forgot2pwd(){
    return (
        <div className="forgot2pwd-page">
            <div className="forgot2pwd-title">
                Forgot Password
            </div>
            <div className="forgot2pwd-form">
                <form action="">
                    <div className="forgot2pwd-form-component">
                        <label className="atlas-font" htmlFor="">College Email</label> <br />
                        <input className="atlas-input" type="email" name="email" id="email" placeholder='Enter your email' />
                    </div>
                    <div className='forgot2pwd-message'>
                        <p className='atlas-font'>A code has been sent to your email. Please enter the code below.</p>
                        <p className='atlas-font'>Didn't receive the code? <Link to="/forgot2pwd" className="text-red-merry">Resend</Link></p>
                    </div>            
                    <div className='forgot2pwd-code'>
                        <input className="atlas-input" type="text" name="code" id="code" placeholder='Enter the code' />
                    </div>
                    <div className="forgot2pwd-btn">
                        <button className='atlas-btn' type="submit">continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
