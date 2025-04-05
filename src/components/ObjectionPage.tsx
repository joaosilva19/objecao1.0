import React from 'react';
import { Objection } from '../App';
import ObjectionList from './ObjectionList';
import StatsPanel from './StatsPanel';
import './ObjectionPage.css';

interface ObjectionPageProps {
  objections: Objection[];
  setObjections: React.Dispatch<React.SetStateAction<Objection[]>>;
}

const ObjectionPage = ({ objections, setObjections }: ObjectionPageProps) => {
  return (
    <div className="objection-page">
      <div className="objection-list-container">
        <ObjectionList objections={objections} setObjections={setObjections} />
      </div>
      <div className="stats-container">
        <StatsPanel objections={objections} />
      </div>
    </div>
  );
};

export default ObjectionPage;
