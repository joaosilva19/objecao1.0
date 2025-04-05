import React from 'react';
import { Objection } from '../App';
import './Modal.css';

interface ModalProps {
  objectionId: number;
  objections: Objection[];
  setObjections: React.Dispatch<React.SetStateAction<Objection[]>>;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  objectionId,
  objections,
  setObjections,
  onClose,
}) => {
  const objection = objections.find((obj) => obj.id === objectionId);
  if (!objection) return null;

  const handleFeedback = (respIndex: number, isPositive: boolean) => {
    setObjections((prev) =>
      prev.map((obj) => {
        if (obj.id === objectionId) {
          const updatedResponses = obj.responses.map((r, idx) => {
            if (idx === respIndex) {
              return {
                ...r,
                positive: isPositive ? r.positive + 1 : r.positive,
                negative: !isPositive ? r.negative + 1 : r.negative,
              };
            }
            return r;
          });
          return { ...obj, responses: updatedResponses };
        }
        return obj;
      })
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{objection.title}</h2>

        <div className="responses">
          {objection.responses.map((resp, index) => (
            <div key={index} className="response-item">
              <p>{resp.text}</p>
              <div className="feedback-buttons">
                <button
                  className="arrow-btn positive"
                  onClick={() => handleFeedback(index, true)}
                  aria-label="Resposta positiva"
                >
                  ↑ {resp.positive}
                </button>
                <button
                  className="arrow-btn negative"
                  onClick={() => handleFeedback(index, false)}
                  aria-label="Resposta negativa"
                >
                  ↓ {resp.negative}
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
