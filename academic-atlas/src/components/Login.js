import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import LoginImg from '../assets/LoginIcon.svg';
import { useUser } from '../contexts/userContext';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
    const { setUser,setLogged } = useUser();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [checked, setChecked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity()) {
            form.reportValidity();
        } else {
            try {
                const response = await userService.login(data);
                setSuccess(response.data.success);
                const status = response.data.success;
                const token = response.data.token;
                setMessage(response.data.message);
                if (status) {
                    setLogged(true);
                    const userData = response.data.user;
                    setUser(userData); 
                    if (checked) {
                        localStorage.setItem('atlasToken', token);
                    }else{ 
                        sessionStorage.setItem('atlasToken', token);
                    }
                    setTimeout(() => {
                        setMessage('');
                        navigate('/');
                    }, 2000);
                } else {
                    setLogged(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000);
                }
            }
            catch (err) {
                setLogged(false);
                console.log(err);
                setMessage('Server is Down, please try again later');
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }
        }
    }

    return (
        <div className="login-page">
            <div className="login-img">
                <img src={LoginImg} alt="login" />
            </div>
            <div className="login-content">
                <div className="login-title atlas-title">
                    Login
                </div>
                <div className="login-form">
                    <form id="atlas-form">
                        <div className="login-form-component">
                            <label className="atlas-font" htmlFor=" ">College Email</label> <br />
                            <input
                                className="atlas-input"
                                type="email"
                                name="email"
                                id="email"
                                required
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                placeholder='Enter your email' />
                        </div>
                        <div className="login-form-component">
                            <label className="atlas-font" htmlFor=" ">Password</label> <br />
                            <div className="password-group password-input-group">
                                <input
                                    className="atlas-input"
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    required
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    placeholder='Enter your password' />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowPwd((prev) => !prev)}>
                                    {showPwd ? (<FaRegEyeSlash title="hide" />) : (<FaEye title="show" />)}
                                </span>
                            </div>
                        </div>
                        <div className="login-adds">
                            <div className="remember-me">
                                <input
                                    title={checked ? "unMark" : "Mark"}
                                    type="checkbox"
                                    name="remember-me"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                    id="remember-me"
                                />
                                <label className="atlas-font" htmlFor="remember-me">Remember Me!</label>
                            </div>
                            <div className="forgotPwd">
                                <Link className='text-red-merry' to="/forgotpassword">Forgot Password?</Link>
                            </div>
                        </div>
                        {
                            message !== '' &&
                            <div className={`login-response-msg ${success}`}>
                                {message}
                            </div>
                        }
                        <div className="login-btn">
                            <button
                                className='atlas-btn'
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="noacnt-signup atlas-font">
                        Don't have an account? <Link to="/signupmail" className="text-red-merry">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
