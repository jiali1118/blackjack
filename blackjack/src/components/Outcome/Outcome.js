import React, { useState, useEffect } from "react";
import OutcomeModal from "./OutcomeModal";

const Outcome = ({ state, dispatch }) => {
  const endGame = () => {
    // Dispatch action to end the game
    dispatch({ type: "NEW_GAME" });
  };

  const startNewRound = () => {
    dispatch({ type: "NEW_ROUND" });
  };

  return (
    <div>
      <OutcomeModal
        outcome={state.outCome}
        onEndGame={endGame}
        onStartNewRound={startNewRound}
      />
    </div>
  );
};

export default Outcome;
