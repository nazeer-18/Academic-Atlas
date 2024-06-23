import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OtpPage.css';
import { Link } from 'react-router-dom';
import verifyOtpImg from '../assets/OTP.svg';

export default function OtpPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [otp, setOtp] = useState(null);
    const email = location.state.email;
    const next = (location.state.choice==="signup")?"/signupacnt":"/resetpassword";
    useEffect(() => {
        setOtp(location.state.otp);
        if (location.state.otp === null) {
            navigate(-1);
        }
    }, [])
    const verifyOtp = (e) => {
        e.preventDefault();
        if (choice === otp) {
            setMessage("OTP verified successfully");
            setSuccess(true);
            setTimeout(() => {
                navigate(next, {
                    state: {
                        email: email
                    }
                })
            }, 1500)
        } else {
            setMessage("Invalid OTP. Please try again");
            setSuccess(false);
        }
        setTimeout(() => {
            setMessage('');
        }, 2000)
    }
    return (
        <div className="OtpPage">
            <div className="OtpPage-img">
                <img src={verifyOtpImg} alt="verifyOtpImg" />
            </div>
            <div className="OtpPage-content">
                <div className="OtpPage-title">
                    Verify Otp
                </div>
                <div className="OtpPage-form">
                    <form action="">
                        <div className="OtpPage-form-component">
                            <label className="atlas-font" htmlFor="">Please enter the code sent to your email</label> <br />
                            <input className="atlas-input"
                                value={choice}
                                onChange={(e) => setChoice(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder='Enter the code' />
                        </div>
                        <div className="OtpPage-adds">
                            Didn't receive the code?<Link to="/verifyotp" className="text-red-merry">Resend</Link>
                        </div>
                        {
                            message !== '' &&
                            <div className={`login-reponse-msg ${success}`}>
                                {message}
                            </div>
                        }
                        <div className="OtpPage-btn">
                            <button
                                onClick={verifyOtp}
                                className='atlas-btn'
                                type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
