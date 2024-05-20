import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="login-page">
            <div className="login-title">
                Login
            </div>
            <div className="login-form">
                <form action="">
                    <div className="login-form-component">
                        <label className="atlas-font" htmlFor="">College Email</label> <br />
                        <input  className="atlas-input" type="email" name="email" id="email" placeholder='Enter your email' />
                    </div>
                    <div className="login-form-component">
                        <label className="atlas-font" htmlFor="">Password</label> <br />
                        <input className="atlas-input" type="password" name="password" id="password" placeholder='Enter your password' />
                    </div>
                    <div className="login-adds">
                        <div className="remember-me">
                            <input type="checkbox" name="remember-me" id="remember-me" />
                            <label className="atlas-font" htmlFor="remember-me">Remember Me!</label>
                        </div>
                        <div className="forgotPwd">
                            <Link className='text-red-merry' to="/forgotpwd">Forgot Password?</Link>
                        </div>
                    </div>
                    <div className="login-btn">
                        <button className='atlas-btn' type="submit">Login</button>
                    </div>
                </form>
                <div className="noacnt-signup atlas-font">
                    Don't have an account? <Link to="/signup" className="text-red-merry">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
