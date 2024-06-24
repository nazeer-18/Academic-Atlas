import React, { useState } from 'react';
import { useUser } from '../contexts/userContext';
import '../styles/ViewProfile.css';

const ViewProfile = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.userName);

  const initials = user.userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = () => {
    setUser({ ...user, userName: newName });
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setNewName(user.userName);  // Set the current name when starting to edit
    setIsEditing(true);
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
                  onChange={handleNameChange}
                  className="view-profile-edit-name-input"
                />
                <button onClick={handleNameSubmit} className="view-profile-save-button">Update</button>
                <button onClick={() => setIsEditing(false)} className="view-profile-cancel-button">Cancel</button>
              </div>
            ) : (
              <div className="view-profile-name-container">
                <p className="view-profile-name">{user.userName}</p>
                <button onClick={handleEditClick} className="view-profile-edit-button">
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="view-profile-info-group">
            <label className="view-profile-label">Email</label>
            <p className="view-profile-email">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;