import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupMail.css';
import SignUpMailIconImg from '../assets/SignUpMailIcon.svg';
import userService from '../services/userService';
import collegeService from '../services/collegeService';
import { useUser } from '../contexts/userContext';

export default function SignupMail() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [loading, setLoading] = useState(true);
    const [domainError, setDomainError] = useState('');

    // Fetch colleges on component mount
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await collegeService.getColleges();
                console.log(response.data); 
                if (response.data && Array.isArray(response.data.results)) {
                    setColleges(response.data.results);
                } else {
                    console.error('Colleges data not found or in wrong format.');
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch colleges:", err);
                setMessage("Failed to load colleges. Please try again later.");
                setSuccess(false);
                setLoading(false);
            }
        };
        

        fetchColleges();
    }, []);

    // Validate email domain against selected college
    const validateEmailDomain = (email, collegeId) => {
        if (!email || !collegeId) return false;

        const college = colleges.find(c => c._id === collegeId);
        if (!college) return false;

        const emailDomain = email.split('@')[1];
        return emailDomain === college.studentDomain;
    };

    const handleMailChange = (e) => {
        setMail(e.target.value);
        // Clear domain error when email changes
        if (domainError) setDomainError('');
    };

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
        // Clear domain error when college changes
        if (domainError) setDomainError('');
    };

    const handleMailVerification = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Check if college is selected
        if (!selectedCollege) {
            setMessage("Please select your college");
            setSuccess(false);
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        // Validate email domain against selected college
        if (!validateEmailDomain(mail, selectedCollege)) {
            setDomainError(`Please use your college email domain (@${colleges.find(c => c._id === selectedCollege)?.studentDomain})`);
            return;
        }

        try {
            const response = await userService.verify({
                email: mail,
                collegeId: selectedCollege
            });

            const status = response.data.success;
            setSuccess(status);
            setMessage(response.data.message);
            const otp = response.data.otp;

            console.log("OTP:", otp);

            if (otp) {
                setMessage("Proceeding with email verification");
                setTimeout(() => {
                    setMessage("OTP sent successfully")
                }, 1000);

                setTimeout(() => {
                    setUser({
                        ...user,
                        email: mail,
                        collegeId: selectedCollege
                    });
                    navigate('/verifyotp', {
                        state: {
                            otp: otp,
                            email: mail,
                            collegeId: selectedCollege,
                            choice: "signup"
                        }
                    });
                }, 2500);
            } else if (status === false) {
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        } catch (err) {
            console.log(err);
            setMessage("Internal server error");
            setSuccess(false);
            setTimeout(() => setMessage(''), 2000);
        }
    };

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
                        {loading ? (
                            <div className="loading-spinner">Loading colleges...</div>
                        ) : (
                            <>
                                <div className="signupmail-form-component">
                                    <label className="atlas-font" htmlFor="college">Select College</label> <br />
                                    <select
                                        className="atlas-input"
                                        id="college"
                                        name="college"
                                        value={selectedCollege}
                                        onChange={handleCollegeChange}
                                        required
                                    >
                                        <option value="">-- Select your college --</option>
                                        {colleges.map(college => (
                                            <option key={college._id} value={college._id}>
                                                {college.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="signupmail-form-component">
                                    <label className="atlas-font" htmlFor="email">College Email</label> <br />
                                    <input
                                        value={mail}
                                        onChange={handleMailChange}
                                        className="atlas-input"
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Enter your college email" 
                                    />
                                    {domainError && (
                                        <div className="domain-error text-red-merry">
                                            {domainError}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div>
                            By continuing, you agree to our <span className="text-red-merry">Terms of Service</span> and <span className="text-red-merry">Privacy Policy</span>
                        </div>

                        {message !== '' && (
                            <div className={`login-response-msg ${success}`}>
                                {message}
                            </div>
                        )}

                        <div className="signupmail-btn">
                            <button
                                className="atlas-btn"
                                onClick={handleMailVerification}
                                disabled={loading}
                            >
                                Proceed and verify email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
