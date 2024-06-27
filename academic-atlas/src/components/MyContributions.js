import React, { useState, useEffect } from 'react'; 
import { faBook, faProjectDiagram, faFlask, faGraduationCap, faArrowRight, faFileLines, faFile } from '@fortawesome/free-solid-svg-icons';
import ContributionCard from './ContributionCard';
import '../styles/MyContributions.css';
import contributionService from '../services/contributionService';
import {useUser} from '../contexts/userContext'; 

function MyContributions() {
  const {user} = useUser();
  const [contributionCounts, setContributionCounts] = useState({
    endsem: 0,
    midsem: 0,
    project: 0,
    research: 0
  }); 
  useEffect(() => {
    const getContributions = async () => {
      try{
        const response = await contributionService.getContributions(user.email);
        setContributionCounts(response.data.contributions);
      }
      catch(err){
        console.log(err);
      }
    }
    getContributions();
  }, [user]);

  return (
    <div className="my-contributions">
      <h1>My Contributions</h1>
      <div className="contributions-container">
        <ContributionCard
          title="Endsem Papers"
          count={contributionCounts.endSem}
          manageLink="/manage-contributions/endsem"
          icon={faFileLines}
        />
        <ContributionCard
          title="Midsem Papers"
          count={contributionCounts.midSem}
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