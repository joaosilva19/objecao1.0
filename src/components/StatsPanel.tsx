import React from 'react';
import { Objection } from '../App';
import './StatsPanel.css';

interface StatsPanelProps {
  objections: Objection[];
}

const StatsPanel = ({ objections }: StatsPanelProps) => {
  if (!objections.length) return null;

  const mostClicked = objections.reduce((prev, current) => {
    return current.clicks > prev.clicks ? current : prev;
  });

  return (
    <div className="stats-panel">
      <h2>Estatísticas</h2>
      <div className="most-clicked">
        <h3>Objeção Mais Clicada:</h3>
        <p>{mostClicked.title}</p>
        <p>Total de Cliques: {mostClicked.clicks}</p>
      </div>
      <div className="feedback-summary">
        <h3>Contadores gerais:</h3>
        <ul>
          {objections.map((obj) => {
            const totalPos = obj.responses.reduce((acc, r) => acc + r.positive, 0);
            const totalNeg = obj.responses.reduce((acc, r) => acc + r.negative, 0);
            return (
              <li key={obj.id}>
                {obj.title}: ↑ {totalPos} / ↓ {totalNeg}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StatsPanel;
