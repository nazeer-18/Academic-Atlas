import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupAcnt.css";
import SignUpAcntImg from '../assets/SignUpAcntIcon.svg';
import { useUser } from '../contexts/userContext';
import userService from '../services/userService';
import collegeService from '../services/collegeService';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function SignupAcnt() {
    const { user } = useUser();
    const navigate = useNavigate();
    
    const [mailAlert, setMailAlert] = useState(null);
    const [nameAlert, setNameAlert] = useState(null);
    const [nameValid, setNameValid] = useState(true);
    const [pwdAlert, setPwdAlert] = useState(null);
    const [pwdValid, setPwdValid] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [confirmPwdAlert, setConfirmPwdAlert] = useState(null);
    const [confirmPwdValid, setConfirmPwdValid] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
    const [allValid, setAllValid] = useState(false);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState(null);
    
    // College-specific states
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [data, setData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    });

    // Fetch college data on component mount
    useEffect(() => {
        if (user.email === '') {
            navigate('/login');
            return;
        }

        // For personal users, we don't need college data, so skip fetching
        if (user.userType === 'personal') {
            setLoading(false);
            return;
        }

        // For institute users, fetch college data if collegeId exists
        if (user.collegeId) {
            const fetchCollegeData = async () => {
                try {
                    const response = await collegeService.getCollegeById(user.collegeId);
                    console.log("Full Response:", response);
                    const collegeData = response.data?.result; 
                    console.log("College data:", collegeData);

                    // Check if collegeData exists and has the necessary properties
                    if (collegeData) {
                        setCollege(collegeData);
                    } else {
                        setResponse("College data not found.");
                        setSuccess(false);
                    }
                    setLoading(false);
                } catch (err) {
                    console.error("Failed to fetch college data:", err);
                    setResponse("Failed to load college data. Please try again later.");
                    setSuccess(false);
                    setLoading(false);
                }
            };
            
            fetchCollegeData();
        } else {
            setLoading(false);
        }
    }, [user.email, user.collegeId, user.userType, navigate]);

    const handleMailClick = (e) => {
        setMailAlert("You can't change mail at this point");
        setSuccess(false);
        setTimeout(() => {
            setMailAlert(null);
        }, 2000);
    }
    
    const handleNameChange = (e) => {
        setData({ ...data, name: e.target.value });
        const checkNameValidity = (name) => {
            const alpharegex = /^[A-Za-z]{3}/;
            if (!alpharegex.test(name)) {
                setNameValid(false);
                setNameAlert('Name Should start with atleast 3 alphabets')
            }
            else {
                setNameValid(true);
                setNameAlert(null);
            }
        }
        checkNameValidity(e.target.value);
    }
    
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
    
    useEffect(() => {
        if (nameValid && pwdValid && confirmPwdValid) {
            setAllValid(true);
        } else {
            setAllValid(false);
        }
    }, [nameValid, pwdValid, confirmPwdValid]);
    
    // Function to generate a unique roll number based on user details
    const generateRollNumber = (userName, email) => {
        // Extract first letters of the name
        const nameInitials = userName
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
        
        // Extract first part of email (before @)
        const emailUsername = email.split('@')[0];
        
        // Get current timestamp in milliseconds (last 6 digits)
        const timestamp = Date.now().toString().slice(-6);
        
        // Combine to create a unique roll number
        return `${nameInitials}${timestamp}`;
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');
        if (!form.checkValidity() || !allValid) {
            e.preventDefault();
            form.reportValidity();
        } else {
            // Process the name properly
            const processedName = data.name.trim().split(/\s+/).join(' ');
            
            // Create new user object with both personal and institute fields
            const newUser = {
                userName: processedName,
                email: user.email,
                password: data.password,
                userType: user.userType // Important! Include the userType from context
            };
            
            // Add collegeId only for institute users
            if (user.userType === 'institute' && user.collegeId) {
                newUser.collegeId = user.collegeId;
                
                // Auto-generate a roll number for institute users
                newUser.rollNo = generateRollNumber(processedName, user.email);
            }
            
            // Add branch if it exists in user context (for institute users)
            if (user.branch) {
                newUser.branch = user.branch;
            }
            
            try {
                const response = await userService.register(newUser);
                setSuccess(response.data.success);
                setResponse(response.data.message);
                if (response.data.success) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000)
                } else {
                    setTimeout(() => {
                        setResponse(null);
                    }, 2000)
                }
            } catch (err) {
                console.error("Registration failed:", err);
                setSuccess(false);
                if (err.response && err.response.data && err.response.data.message) {
                    setResponse(err.response.data.message);
                } else {
                    setResponse("Registration failed. Please try again later.");
                }
                setTimeout(() => {
                    setResponse(null);
                }, 2000);
            }
        }
    }
    
    if (loading) {
        return <div className="loading-center">Loading user data...</div>
    }
    
    return (
        <div>
            <div className="signup-acnt-page">
                <div className="signup-acnt-img">
                    <img src={SignUpAcntImg} alt="SignUpAcnt" />
                </div>
                <div className="signup-acnt-content">
                    <div className="signup-acnt-title atlas-title">
                        {user.userType === 'institute' ? 
                            `Signup for ${college?.name || 'College'}` : 
                            'Complete Your Account'}
                    </div>
                    <div className="signup-acnt-form">
                        <form action="" id="atlas-form">
                            <div className="signup-acnt-form-component"
                                onClick={handleMailClick}>
                                <label className="atlas-label" htmlFor="email">Email</label> <br />
                                <input
                                    className="atlas-input"
                                    type="email"
                                    disabled
                                    value={user.email}
                                    id="email"
                                    name="email"
                                />
                            </div>
                            {
                                mailAlert &&
                                <div className={`login-response-msg ${success}`}>
                                    {mailAlert}
                                </div>
                            }
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="name">Name</label> <br />
                                <input
                                    className="atlas-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={data.name}
                                    onChange={handleNameChange}
                                    placeholder="Enter your name" />
                            </div>
                            {
                                !nameValid &&
                                <div className={`login-response-msg ${success}`}>
                                    {nameAlert}
                                </div>
                            }
                            
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="password">Password</label> <br />
                                <div className="password-input-group">
                                    <input
                                        className="atlas-input"
                                        type={showPwd ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        value={data.password}
                                        onChange={handlePwdChange}
                                        placeholder="Enter your password" />
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
                            {
                                pwdAlert &&
                                <div className={`login-response-msg ${success}`}>
                                    {pwdAlert}
                                </div>
                            }
                            <div className="signup-acnt-form-component">
                                <label className="atlas-label" htmlFor="confirm-password">Confirm Password</label> <br />
                                <div className="password-input-group">
                                    <input
                                        className="atlas-input"
                                        type={showConfirmPwd ? "text" : "password"}
                                        id="confirm-password"
                                        name="confirm-password"
                                        required
                                        value={data.confirmPassword}
                                        disabled={!pwdValid}
                                        onChange={handleConfirmPwdChange}
                                        placeholder="Confirm your password" />
                                    <span
                                        className="eye-display"
                                        onClick={() => setShowConfirmPwd((prev) => !prev)}>
                                        {showConfirmPwd
                                            ? (<FaRegEyeSlash title="hide" />)
                                            : (<FaEye title="show" />)
                                        }
                                    </span>
                                </div>
                            </div>
                            {
                                confirmPwdAlert &&
                                <div className={`login-response-msg ${success}`}>
                                    {confirmPwdAlert}
                                </div>
                            }
                            <div className="signup-acnt-terms text-red-merry">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    name="terms" />
                                <label htmlFor="terms">I agree to the terms and conditions</label>
                            </div>
                            {
                                response &&
                                <div className={`login-response-msg ${success}`}>
                                    {response}
                                </div>
                            }
                            <div className="signup-acnt-btn">
                                <button
                                    className="atlas-btn" 
                                    onClick={handleRegister}
                                    type="submit">
                                    Create account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}