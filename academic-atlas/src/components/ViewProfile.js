import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import '../styles/ViewProfile.css';
import userService from '../services/userService';

const ViewProfile = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [newName, setNewName] = useState(user.userName);
  const [initials, setInitials] = useState();
  const changeInitials = (name) => {
    if (name === '') {
      setInitials('undef');
      return;
    }
    const nameWithNoExtraSpaces = name.trim().split(/\s+/).join(' ');
    const temp = nameWithNoExtraSpaces.split(' ').map(n => n[0].toUpperCase())
    setInitials(temp);
  }
  useEffect(() => {
    setNewName(user.userName) 
    const setViewUser = () => {
        changeInitials(user.userName); 
    }
    setViewUser();
    window.addEventListener('load', setViewUser);
    return () => {
      window.removeEventListener('load', setViewUser);
    }
  }, [user])
  const handleNameSubmit = async () => {
    try {
      const response = await userService.changeName(user.email, newName);
      setSuccess(response.data.success);
      setMessage(response.data.message);
      if (response.data.success) {
        setUser({ ...user, userName: newName });
        console.log(user)
        changeInitials(newName)
      } else {
        setNewName(user.userName);
      }
    } catch (err) {
      console.log(err)
      setNewName(user.userName);
      setSuccess(false);
      setMessage('Internal server error');
    }
    setIsEditing(false);
    setTimeout(() => {
      setMessage('');
    }, 2000)
  };

  return (
    <div className="view-profile-container">
      <div className="view-profile-card">
        <div className="view-profile-header">
          <div className="view-profile-picture">{initials}</div>
          <h1 className="view-profile-title">User Profile</h1>
        </div>
        <div className="view-profile-info">
          <div className="view-profile-info-group">
            <label className="view-profile-label">Name</label>
            {isEditing ? (
              <div className="view-profile-edit-name-container">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="view-profile-edit-name-input"
                />
                <button onClick={handleNameSubmit} className="view-profile-save-button">Update</button>
                <button onClick={() => setIsEditing(false)} className="view-profile-cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="view-profile-name-container">
                <p className="view-profile-name">{user.userName}</p>
                <button onClick={(e) => { setIsEditing(true) }} className="view-profile-edit-button">
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="view-profile-info-group">
            <label className="view-profile-label">Email</label>
            <p className="view-profile-email">{user.email}</p>
          </div>
          {
            message !== '' &&
            <div className={`login-response-msg ${success}`}>
              {message}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;