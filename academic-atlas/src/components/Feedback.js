import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useUser } from '../contexts/userContext';
import '../styles/Feedback.css';

const API_BASE_URL = 'http://localhost:8080/api';

const Feedback = () => {
  const { user } = useUser();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user._id) {
      checkExistingFeedback();
    } else {
      setIsLoading(false);
    }
  }, [user._id]);

  const checkExistingFeedback = async () => {
    try {
      const token = localStorage.getItem('atlasToken') || sessionStorage.getItem('atlasToken');
      const response = await axios.get(`${API_BASE_URL}/feedback/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success && response.data.feedback) {
        setRating(response.data.feedback.rating);
        setFeedback(response.data.feedback.description);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error checking existing feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || !feedback) {
      setMessage('Please provide both a rating and feedback.');
      setIsSuccess(false);
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('atlasToken') || sessionStorage.getItem('atlasToken');
      const response = await axios.post(`${API_BASE_URL}/feedback/submit`, {
        userId: user._id,
        rating,
        description: feedback
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMessage(isSubmitted ? 'Your feedback has been updated!' : 'Thank you for your feedback!');
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSubmitted(true);
          setIsEditing(false);
          setMessage('');
        }, 2000);
      } else {
        setMessage(response.data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.response || error);
      setMessage(error.response?.data?.message || 'An error occurred while submitting feedback. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isLoading) {
    return <div className="feedback-page">Loading...</div>;
  }

  return (
    <div className="feedback-page">
      <div className="feedback-page-content">
        <h1 className="feedback-page-title">How was your experience?</h1>
        <p className="feedback-page-subtitle">We'd love to hear your thoughts!</p>
        
        <form className="feedback-page-form" onSubmit={handleSubmit}>
          <div className="feedback-page-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index} className="feedback-page-star-label">
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="feedback-page-star-input"
                    disabled={isSubmitted && !isEditing}
                  />
                  <FaStar
                    className="feedback-page-star-icon"
                    color={ratingValue <= (hover || rating) ? "#FFD700" : "#e4e5e9"}
                    size={50}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <textarea
            className="feedback-page-textarea"
            placeholder="Tell us about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={isSubmitted && !isEditing}
          />
          
          {message && (
            <p className={`feedback-message ${isSuccess ? 'true' : 'false'}`}>
              {message}
            </p>
          )}

          {(!isSubmitted || isEditing) && (
            <button className="feedback-page-submit-btn" type="submit">
              {isEditing ? 'Update Feedback' : 'Submit Feedback'}
            </button>
          )}
          {isSubmitted && !isEditing && (
            <button className="feedback-page-edit-btn" type="button" onClick={handleEdit}>
              Edit Feedback
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Feedback;