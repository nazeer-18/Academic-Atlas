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
    const [userType, setUserType] = useState('personal'); 
    
    const [personalEmail, setPersonalEmail] = useState('');
    
    const [mail, setMail] = useState('');
    const [rollNo, setRollNo] = useState('');
    
    // Common states
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [loading, setLoading] = useState(true);
    const [domainError, setDomainError] = useState('');

    // Branch-related states (added from SignupAcnt)
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

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

    // Fetch branches when college is selected
    useEffect(() => {
        if (selectedCollege) {
            const fetchBranches = async () => {
                try {
                    const response = await collegeService.getCollegeById(selectedCollege);
                    if (response.data && response.data.result && response.data.result.branches) {
                        setBranches(response.data.result.branches);
                    } else {
                        console.error('Branch data not found or in wrong format.');
                        setBranches([]);
                    }
                } catch (err) {
                    console.error("Failed to fetch branches:", err);
                    setBranches([]);
                }
            };
            
            fetchBranches();
        } else {
            setBranches([]);
        }
    }, [selectedCollege]);

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
        if (domainError) setDomainError('');
    };

    const handlePersonalEmailChange = (e) => {
        setPersonalEmail(e.target.value);
    };

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
        setSelectedBranch(''); // Reset branch when college changes
        if (domainError) setDomainError('');
    };

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleMailVerification = async (e) => {
        e.preventDefault();
        const form = document.getElementById('atlas-form');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (userType === 'personal') {
            // Handle personal user verification
            try {
                // Assuming your backend can handle personal email verification
                const response = await userService.verify({
                    email: personalEmail,
                    userType: 'personal'
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
                            email: personalEmail,
                            userType: 'personal'
                        });
                        navigate('/verifyotp', {
                            state: {
                                otp: otp,
                                email: personalEmail,
                                userType: 'personal',
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
        } else {
            // Handle institute user verification
            // Check if college and branch are selected
            if (!selectedCollege) {
                setMessage("Please select your college");
                setSuccess(false);
                setTimeout(() => setMessage(''), 2000);
                return;
            }

            if (!selectedBranch) {
                setMessage("Please select your branch");
                setSuccess(false);
                setTimeout(() => setMessage(''), 2000);
                return;
            }

            // Check if roll number is provided
            if (!rollNo) {
                setMessage("Roll Number is required");
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
                    collegeId: selectedCollege,
                    branch: selectedBranch, // Using selectedBranch instead of branch
                    rollNo: rollNo,
                    userType: 'institute'
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
                            collegeId: selectedCollege,
                            branch: selectedBranch, // Using selectedBranch instead of branch
                            rollNo: rollNo,
                            userType: 'institute'
                        });
                        navigate('/verifyotp', {
                            state: {
                                otp: otp,
                                email: mail,
                                collegeId: selectedCollege,
                                branch: selectedBranch, // Using selectedBranch instead of branch
                                rollNo: rollNo,
                                userType: 'institute',
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
                        <div className="signupmail-form-component">
                            <label className="atlas-font" htmlFor="userType">User Type</label> <br />
                            <select
                                className="atlas-input"
                                id="userType"
                                name="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                                required
                            >
                                <option value="personal">Personal</option>
                                <option value="institute">Institute</option>
                            </select>
                        </div>

                        {userType === 'personal' ? (
                            // Personal user form
                            <div className="signupmail-form-component">
                                <label className="atlas-font" htmlFor="personalEmail">Email</label> <br />
                                <input
                                    value={personalEmail}
                                    onChange={handlePersonalEmailChange}
                                    className="atlas-input"
                                    type="email"
                                    id="personalEmail"
                                    name="personalEmail"
                                    required
                                    placeholder="Enter your email" 
                                />
                            </div>
                        ) : (
                            // Institute user form
                            loading ? (
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

                                    {/* Branch selection from SignupAcnt */}
                                    <div className="signupmail-form-component">
                                        <label className="atlas-font" htmlFor="branch">Branch</label> <br />
                                        <select
                                            className="atlas-input"
                                            id="branch"
                                            name="branch"
                                            value={selectedBranch}
                                            onChange={handleBranchChange}
                                            required
                                            disabled={!selectedCollege} // Disable until college is selected
                                        >
                                            <option value="">-- Select your branch --</option>
                                            {branches.map((branch) => (
                                                <option key={branch._id} value={branch._id}>
                                                    {branch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="signupmail-form-component">
                                        <label className="atlas-font" htmlFor="rollNo">Roll Number</label> <br />
                                        <input
                                            value={rollNo}
                                            onChange={(e) => setRollNo(e.target.value)}
                                            className="atlas-input"
                                            type="text"
                                            id="rollNo"
                                            name="rollNo"
                                            required
                                            placeholder="Enter your roll number" 
                                        />
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
                            )
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
                                disabled={loading && userType === 'institute'}
                            >
                                Proceed and verify email
                            </button>
                        </div>
                        
                        <div className="signup-link">
                            Already have an account? <a href="/login" className="text-red-merry">Login here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}