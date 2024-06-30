import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useUser } from '../contexts/userContext';
import feedbackService from '../services/feedbackService';
import '../styles/Feedback.css';

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
    if (user.email !== '') { 
      checkExistingFeedback();
    }
  },[user.email]);

  const checkExistingFeedback = async () => {
    try {
      const response = await feedbackService.checkExistingFeedback(user.email);
      if (response.data.success) {
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
      setMessage('Please provide both rating and feedback.');
      setIsSuccess(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await feedbackService.submitFeedback(user.email, rating, feedback);

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
            placeholder="Tell us about your experience... (max 50 characters)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, 50))}
            disabled={isSubmitted && !isEditing}
            maxLength={50}
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