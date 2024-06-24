import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faProjectDiagram, faFlask, faGraduationCap, faArrowRight, faFileLines, faFile } from '@fortawesome/free-solid-svg-icons';
import '../styles/MyContributions.css';

const ContributionCard = ({ title, count, manageLink, icon }) => {
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

function MyContributions() {
  const [contributionCounts, setContributionCounts] = useState({
    endsem: 0,
    midsem: 0,
    project: 0,
    research: 0
  });

  useEffect(() => {
    // Fetch data from backend (using dummy data for now)
    setContributionCounts({
      endsem: 5,
      midsem: 3,
      project: 2,
      research: 1
    });
  }, []);

  return (
    <div className="my-contributions">
      <h1>My Contributions</h1>
      <div className="contributions-container">
        <ContributionCard
          title="Endsem Papers"
          count={contributionCounts.endsem}
          manageLink="/manage-contributions/endsem"
          icon={faFileLines}
        />
        <ContributionCard
          title="Midsem Papers"
          count={contributionCounts.midsem}
          manageLink="/manage-contributions/midsem"
          icon={faFileLines}
        />
        <ContributionCard
          title="Projects"
          count={contributionCounts.project}
          manageLink="/manage-contributions/project"
          icon={faProjectDiagram}
        />
        <ContributionCard
          title="Research Papers"
          count={contributionCounts.research}
          manageLink="/manage-contributions/research"
          icon={faFileLines}
        />
      </div>
    </div>
  );
}

export default MyContributions;