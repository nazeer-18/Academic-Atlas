import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SignupMail.css'
import SignUpMailIconImg from '../assets/SignUpMailIcon.svg'
import userService from '../services/userService'
import { useUser } from '../contexts/userContext'

export default function SignupMail() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [mail, setMail] = useState(null);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const handleMailVerification = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            try {
                const response = await userService.verify(mail);
                const status = response.data.success;
                setSuccess(status);
                setMessage(response.data.message);
                const otp = response.data.otp;
                if (otp) {
                    setMessage("Proceeding with email verification");
                    setTimeout(() => {
                        setMessage("Otp sent succesfully")
                    }, 1000)
                    setTimeout(() => {
                        setUser({ ...user, email: mail })
                        navigate('/verifyotp', {
                            state: {
                                otp: otp,
                                email: mail,
                                choice: "signup"
                            }
                        })
                    }, 2500)
                } else if (status === false ) {
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
        <div className="signupmail-page">
            <div className="signupmail-img">
                <img src={SignUpMailIconImg} alt="signupmail" />
            </div>
            <div className="signupmail-content">
                <div className="atlas-title signupmail-title">
                    Signup
                </div>
                <div className="signupmail-form">
                    <form id="atlas-form">
                        <div className="signupmail-form-component">
                            <label className="atlas-font" htmlFor="email">College Email</label> <br />
                            <input
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                className="atlas-input"
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Enter your email" />
                        </div>
                        <div>
                            By continuing, you agree to our <span className="text-red-merry">Terms of Service</span> and <span className="text-red-merry">Privacy Policy</span>
                        </div>
                        {
                            message !== '' &&
                            <div className={`login-response-msg ${success}`}>
                                {message}
                            </div>
                        }
                        <div className="signupmail-btn">
                            <button
                                className="atlas-btn"
                                onClick={handleMailVerification}>
                                Proceed and verify email
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}
