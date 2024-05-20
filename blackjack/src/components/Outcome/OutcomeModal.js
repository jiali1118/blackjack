import React from "react";
import "./Outcome.css";
import { Button } from "react-bootstrap";
const OutcomeModal = ({ outcome, onEndGame, onStartNewRound }) => {
  return (
    <div className="modal-overlay">
      <div className="modall">
        <div className="modal-content">
          <h2 className="outcome-text">{outcome}</h2>
          <div>
            <Button variant="danger" onClick={onEndGame}>
              End Game
            </Button>
            {outcome !== "OUT OF FUNDS" ? (
              <Button variant="success" onClick={onEndGame}>
                New Round
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomeModal;
