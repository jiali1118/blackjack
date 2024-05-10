import React from "react";
import "./Outcome.css";
const OutcomeModal = ({ outcome, onEndGame, onStartNewRound }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2 class="outcome-text">{outcome}</h2>
          <div>
            <button onClick={onEndGame}>End Game</button>
            {outcome !== "OUT OF FUNDS" ? (
              <button onClick={onStartNewRound}>Start New Round</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomeModal;
