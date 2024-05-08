// Player.js
import React from "react";
import RenderHand from "../RenderHand/RenderHand";
const Player = ({ state, dispatch }) => {
  return (
    <div id="playerhand">
      <h2>Player 1</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ padding: "0 10px" }}>
          {state.playerScore !== 0 ? "Score : " + state.playerScore : null}
        </p>
        <p>{state.roundStarted ? "Bet: $" + state.betAmount : null}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RenderHand playerHands={state.playerHands} />
      </div>
    </div>
  );
};

export default Player;
