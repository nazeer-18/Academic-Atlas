import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/Feedback.css';

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Here you would send the data to your server
    alert('Thank you for your feedback!');
    setRating(null);
    setFeedback('');
  };

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
          />
          <button className="feedback-page-submit-btn" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;