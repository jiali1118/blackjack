// Player.js
import React from "react";

const Player = ({ playerScore, roundStarted, betAmount, playerHands }) => {
  return (
    <div id="playerhand">
      <h2>Player 1</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ padding: "0 10px" }}>
          {playerScore !== 0 ? "Score : " + playerScore : null}
        </p>
        <p>{roundStarted ? "Bet: $" + betAmount : null}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RenderHand playerHands={playerHands} />
      </div>
    </div>
  );
};

export default Player;
