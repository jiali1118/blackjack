import React from "react";
import "./Outcome.css";
const OutcomeModal = ({ outcome, onEndGame, onStartNewRound }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>{outcome}</h2>
          <div>
            <button onClick={onEndGame}>End Game</button>
            <button onClick={onStartNewRound}>Start New Round</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomeModal;
