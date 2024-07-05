import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';
import ForgotpwdImg from '../assets/ForgotPasswordIcon.svg';
import userService from '../services/userService';
import { useUser } from '../contexts/userContext'

export default function ForgotPassword() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [mail, setMail] = useState(null);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            try {
                const response = await userService.verifyForgot(mail);
                const status = response.data.success;
                setSuccess(status);
                setMessage(response.data.message);
                if (status) {
                    setUser({ ...user, email: mail })
                    const otp = response.data.otp;
                    setMessage("Proceeding with email verification");
                    if (otp) {
                        setTimeout(() => {
                            setMessage("Otp sent succesfully")
                        }, 1000)
                        setTimeout(() => {
                            navigate('/verifyotp', {
                                state: {
                                    otp: otp,
                                    email: mail,
                                    choice: "forgotPassword"
                                }
                            })
                        }, 2500)
                    }
                    else {
                        setMessage("unable to send mail.Please try later");
                        setSuccess(false); 
                    }
                } else {
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000)
                }
            }
            catch (err) {
                console.log(err)
                setMessage("Internal server error");
                setSuccess(false);
            }
        }
        setTimeout(() => {
            setMessage('');
        }, 2000)
    }
    return (
        <div className="forgot-password-page">

            <div className="Forgotpwd-img">
                <img src={ForgotpwdImg} alt="Forgotpwd" />
            </div>
            <div className="Forgotpwd-content">
                <div className="forgot-password-title">
                    Forgot Password
                </div>
                <div className="forgot-password-form">
                    <form id="atlas-form">
                        <div className="forgot-password-form-component">
                            <label className="atlas-font" htmlFor="">College Email</label> <br />
                            <input
                                className="atlas-input forgotpwd-input"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder='Enter your email' />
                        </div>
                        <div className="forgot-password-adds a">
                            Remember your password ?<Link to="/login" className="text-red-merry">Login</Link>
                        </div>
                        {
                            message !== '' &&
                            <div className={`login-response-msg ${success}`}>
                                {message}
                            </div>
                        }
                        <div className="forgot-password-btn">
                            <button
                                onClick={handleForgotPassword}
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
