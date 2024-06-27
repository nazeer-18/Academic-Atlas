import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/MyContributions.css';

export default function ContributionCard({ title, count, manageLink, icon }) {
  return (
    <div className="contribution-card">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>Contributions: <span className="count">{count}</span></p>
        <Link to={manageLink} className="manage-btn">
          Manage
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
};