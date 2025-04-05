import React, { useState } from 'react';
import { Objection } from '../App';
import Modal from './Modal';
import './ObjectionList.css';

interface ObjectionListProps {
  objections: Objection[];
  setObjections: React.Dispatch<React.SetStateAction<Objection[]>>;
}

const ObjectionList = ({ objections, setObjections }: ObjectionListProps) => {
  const [selectedObjectionId, setSelectedObjectionId] = useState<number | null>(null);

  const handleOpenModal = (obj: Objection) => {
    setObjections((prev) =>
      prev.map((o) =>
        o.id === obj.id ? { ...o, clicks: o.clicks + 1 } : o
      )
    );
    setSelectedObjectionId(obj.id);
  };

  const handleCloseModal = () => {
    setSelectedObjectionId(null);
  };

  return (
    <>
      <div className="objection-grid">
        {objections.map((obj) => (
          <div
            key={obj.id}
            className="objection-card"
            onClick={() => handleOpenModal(obj)}
          >
            <h3>{obj.title}</h3>
            <span className="clicks">Cliques: {obj.clicks}</span>
          </div>
        ))}
      </div>

      {selectedObjectionId !== null && (
        <Modal
          objectionId={selectedObjectionId}
          objections={objections}
          setObjections={setObjections}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ObjectionList;
