import React, { useState, useEffect } from "react";
import OutcomeModal from "./OutcomeModal";

const Outcome = ({ state, dispatch }) => {
  const endGame = () => {
    // Dispatch action to end the game
    // For example: dispatch({ type: 'END_GAME' });
  };

  const startNewRound = () => {
    // Dispatch action to start a new round
    // For example: dispatch({ type: 'START_NEW_ROUND' });
  };

  return (
    <div>
      {showModal && (
        <OutcomeModal
          outcome="The winner is the dealer"
          onEndGame={endGame}
          onStartNewRound={startNewRound}
        />
      )}
    </div>
  );
};

export default Outcome;
