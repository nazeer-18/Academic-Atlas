import React, { useState, useEffect } from 'react';
import '../styles/UpdatePassword.css';
import UpdatePasswordImg from '../assets/UpdatePassword.svg';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

const UpdatePassword = () => {
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [currentPasswordAlert, setCurrentPasswordAlert] = useState('');
  const [newPasswordAlert, setNewPasswordAlert] = useState('');
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('Praneeth');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(() => {
    setOriginalPassword('Praneeth');
  }, []);

  const handleCurrentPasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setData({ ...data, currentPassword: enteredPassword });
    
    if (enteredPassword === originalPassword) {
      setIsCurrentPasswordValid(true);
      setCurrentPasswordAlert('');
    } else {
      setIsCurrentPasswordValid(false);
      setCurrentPasswordAlert('Current password is incorrect');
    }
  };

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setData({ ...data, newPassword: newPassword });
    checkPasswordValidity(newPassword);
  };

  const checkPasswordValidity = (pwd) => {
    const smallRegex = /[a-z]/;
    const capsRegex = /[A-Z]/;
    const numRegex = /[0-9]/;

    if (!capsRegex.test(pwd)) {
      setNewPasswordAlert('Password should contain at least one uppercase letter');
      setIsNewPasswordValid(false);
    } else if (!smallRegex.test(pwd)) {
      setNewPasswordAlert('Password should contain at least one lowercase letter');
      setIsNewPasswordValid(false);
    } else if (!numRegex.test(pwd)) {
      setNewPasswordAlert('Password should contain at least one digit');
      setIsNewPasswordValid(false);
    } else if (pwd.length < 6) {
      setNewPasswordAlert('Password should be at least 6 characters long');
      setIsNewPasswordValid(false);
    } else {
      setNewPasswordAlert('');
      setIsNewPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setData({ ...data, confirmPassword: confirmPassword });

    if (confirmPassword !== data.newPassword) {
      setConfirmPasswordAlert('Passwords do not match');
      setIsConfirmPasswordValid(false);
    } else {
      setConfirmPasswordAlert('');
      setIsConfirmPasswordValid(true);
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      // Add your logic here to update the password
      console.log('Password update submitted');
      setResponse('Password updated successfully!');
    }
  };

  return (
    <div>
        <div className="update-password-page">
            <div className="update-password-img">
                <img src={UpdatePasswordImg} alt="UpdatePassword" />
            </div>
            <div className="update-password-content">
                <div className="update-password-title atlas-title">
                    Update Password
                </div>
                <div className="update-password-form">
                    <form action="" id="update-password-form">
                        <div className="update-password-form-component">
                            <label className="update-password-label" htmlFor="current-password">Current Password</label> <br />
                            <div className="update-password-input-group">
                                <input
                                    className="update-password-input"
                                    type={showCurrentPwd ? "text" : "password"}
                                    id="current-password"
                                    name="current-password"
                                    required
                                    value={data.currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    placeholder="Enter your current password" />
                                <span
                                    className="update-password-eye-display"
                                    onClick={() => setShowCurrentPwd((prev) => !prev)}>
                                    {showCurrentPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                            </div>
                        </div>
                        {
                            currentPasswordAlert &&
                            <div className="update-password-response-msg">
                                {currentPasswordAlert}
                            </div>
                        }
                        <div className={`update-password-form-component ${!isCurrentPasswordValid ? 'cursor-disabled' : ''}`}>
                            <label className="update-password-label" htmlFor="new-password">New Password</label> <br />
                            <div className="update-password-input-group ">
                                <input
                                    className="update-password-input"
                                    type={showNewPwd ? "text" : "password"}
                                    id="new-password"
                                    name="new-password"
                                    required
                                    value={data.newPassword}
                                    onChange={handleNewPasswordChange}
                                    placeholder="Enter your new password"
                                    disabled={!isCurrentPasswordValid} />
                                <span
                                    className={`update-password-eye-display ${!isCurrentPasswordValid ? 'disabled' : ''}`}
                                    onClick={() => isCurrentPasswordValid && setShowNewPwd((prev) => !prev)}>
                                    {showNewPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                            </div>
                        </div>
                        {
                            newPasswordAlert &&
                            <div className="update-password-response-msg">
                                {newPasswordAlert}
                            </div>
                        }
                        <div className={`update-password-form-component ${!isCurrentPasswordValid || !isNewPasswordValid ? 'cursor-disabled' : ''}`}>
                            <label className="update-password-label" htmlFor="confirm-password">Confirm New Password</label> <br />
                            <div className="update-password-input-group">
                                <input
                                    className="update-password-input"
                                    type={showConfirmPwd ? "text" : "password"}
                                    id="confirm-password"
                                    name="confirm-password"
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm your new password"
                                    disabled={!isCurrentPasswordValid || !isNewPasswordValid} 
                                />
                                <span
                                    className={`update-password-eye-display ${!isCurrentPasswordValid || !isNewPasswordValid ? 'disabled' : ''}`}
                                    onClick={() => isCurrentPasswordValid && isNewPasswordValid && setShowConfirmPwd((prev) => !prev)} 
                                >
                                    {showConfirmPwd
                                        ? (<FaRegEyeSlash title="hide" />)
                                        : (<FaEye title="show" />)
                                    }
                                </span>
                            </div>
                        </div>
                        {
                            confirmPasswordAlert &&
                            <div className="update-password-response-msg">
                                {confirmPasswordAlert}
                            </div>
                        }
                        {
                            response &&
                            <div className="update-password-response-msg">
                                {response}
                            </div>
                        }
                        <div className="update-password-btn-container">
                            <button
                                className={`update-password-btn ${(isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) ? '' : 'disabled'}`}
                                onClick={handleUpdatePassword}
                                style={{cursor: (isCurrentPasswordValid && isNewPasswordValid && isConfirmPasswordValid) ? 'pointer' : 'not-allowed'}} 
                                type="submit"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UpdatePassword;
