import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { } from 'react-router-dom'
import "../styles/Resetpassword.css";
import userService from "../services/userService";
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import ResetpwdImg from '../assets/ResetpwdIcon.svg'
import { useUser } from '../contexts/userContext'

export default function Resetpassword() {
    const { user, setUser } = useUser();
    const [showPwd, setShowPwd] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [confirmPwdValid, setConfirmPwdValid] = useState(false);
    const [pwdAlert, setPwdAlert] = useState('');
    const [confirmPwdAlert, setConfirmPwdAlert] = useState('');
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setUser(user)
    }, [user])
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const handlePwdChange = (e) => {
        setData({ ...data, password: e.target.value });
        const checkPwdValidity = (pwd) => {
            const smallregex = /[a-z]/;
            const capsregex = /[A-Z]/;
            const numregex = /[0-9]/;
            if (!capsregex.test(pwd)) {
                setPwdValid(false);
                setPwdAlert('Password should contain atleast one uppercase letter')
            }
            else if (!smallregex.test(pwd)) {
                setPwdValid(false);
                setPwdAlert('Password should contain atleast one lowercase letter')
            }
            else if (!numregex.test(pwd)) {
                setPwdValid(false);
                setPwdAlert('Password should contain atleast one digit')
            }
            else if (pwd.length < 6) {
                setPwdValid(false);
                setPwdAlert('Password should be atleast 6 characters long')
            } else {
                setPwdValid(true);
                setPwdAlert(null);
            }
        }
        checkPwdValidity(e.target.value);
    }
    const handleConfirmPwdChange = (e) => {
        setData({ ...data, confirmPassword: e.target.value });
        if (data.password !== e.target.value) {
            setConfirmPwdValid(false);
            setConfirmPwdAlert('Passwords do not match')
        }
        else {
            setConfirmPwdValid(true);
            setConfirmPwdAlert(null);
        }
    }
    const handlereset = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity() || !pwdValid || !confirmPwdValid) {
            form.reportValidity();
            return;
        }
        if (data.password !== data.confirmPassword) {
            setMessage("passwords didn't match");
            setSuccess(false);
        }
        else {
            try {
                const response = await userService.resetPassword(user.email, data.password);
                const success = response.data.success;
                setSuccess(response.data.success); 
                setMessage(response.data.message);
                if (success) {
                    setTimeout(() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.href="/";
                    }, 2000)
                }
            }
            catch (err) {
                console.log(err);
                setMessage("Internal server error");
                setSuccess(false);
            }
        }
        setTimeout(() => {
            setMessage(''); 
        }, 2000)

    }
    return (
        <div className="Resetpassword-page">
            <div className="Resetpwd-img">
                <img src={ResetpwdImg} alt="Resetpwd" />
            </div>
            <div className="Resetpwd-content">
                <div className="Resetpassword-title">
                    <h1>Reset your password</h1>
                </div>
                <div className="Resetpassword-form">
                    <form action="" id="atlas-form">

                        <div className="Resetpassword-form-component">
                            <label className="atlas-font" htmlFor="password">Password</label> <br />
                            <div className="password-input-group">

                                <input className="atlas-input"
                                    type={showPwd ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    placeholder="New password"
                                    value={data.password}
                                    onChange={handlePwdChange} />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowPwd((prev) => !prev)}>
                                    {showPwd ? (<FaRegEyeSlash title="hide" />) : (<FaEye title="show" />)}
                                </span>
                            </div>
                        </div>
                        {
                            pwdAlert &&
                            <div className={`login-response-msg ${success}`}>
                                {pwdAlert}
                            </div>
                        }
                        <div className="Resetpassword-form-component">
                            <label className="atlas-font" htmlFor="confirm-password">Confirm Password</label> <br />
                            <div className="password-input-group">
                                <input className="atlas-input"
                                    type={showConfirmPwd ? "text" : "password"}
                                    id="repeatpassword"
                                    name="repeatpassword"
                                    placeholder="Confirm password"
                                    value={data.confirmPassword}
                                    required
                                    disabled={!pwdValid}
                                    onChange={handleConfirmPwdChange} />
                                <span
                                    className="eye-display"
                                    onClick={() => setShowConfirmPwd((prev) => !prev)}>
                                    {showPwd ? (<FaRegEyeSlash title="hide" />) : (<FaEye title="show" />)}
                                </span>
                            </div>
                        </div>
                        {
                            confirmPwdAlert &&
                            <div className={`login-response-msg ${success}`}>
                                {confirmPwdAlert}
                            </div>
                        }
                        <div className="rememberpassword-reset atlas-font">
                            Remember your password? <Link to="/Login" className="text-red-merry">Login</Link>
                        </div>
                        {
                            message !== '' &&
                            <div className={`login-response-msg ${success}`}>
                                {message}
                            </div>
                        }
                        <div className="Resetpassword-btn">
                            <button className="atlas-btn" type="submit" onClick={handlereset}>Reset password</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}