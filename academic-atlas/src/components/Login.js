import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import userService from '../services/userService'
import LoginImg from '../assets/LoginIcon.svg'
import { useUser } from '../contexts/userContext'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
    const { setUser } = useUser();
    const [message, setMessage] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [checked,setChecked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const Navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await userService.login(data);
            const sucess = response.data.success;
            setMessage(response.data.message);
            if (sucess) {
                setSuccess(true);
                console.log(response.data);
                setUser(response.data.user);
                setTimeout(() => {
                    setMessage('');
                    Navigate('/')
                }, 2000)
            } else {
                setTimeout(() => {
                    setMessage('');
                }, 2000)
            }
        }
        catch (err) {
            console.log(err);
            setMessage('Server is Down, please try again later');
            setTimeout(() => {
                setMessage('');
            }, 2000)
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
                    <form action="">
                        <div className="login-form-component">
                            <label className="atlas-font" htmlFor="">College Email</label> <br />
                            <input
                                className="atlas-input"
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                placeholder='Enter your email' />
                        </div>
                        <div className="login-form-component">
                            <label className="atlas-font" htmlFor="">Password</label> <br />
                            <div className="password-group password-input-group">
                                <input
                                    className="atlas-input"
                                    type={showPwd ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    placeholder='Enter your password' />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowPwd((prev) => !prev)}>
                                    {showPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
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
                            <div className={`login-reponse-msg ${success}`}>
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
                    <script src="localstorage.js"></script>
                </div>
            </div>
        </div>
    )
}
