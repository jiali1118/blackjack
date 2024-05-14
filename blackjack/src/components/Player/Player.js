// Player.js
import React from "react";
import RenderHand from "../RenderHand/RenderHand";
import RenderSplitHand from "../RenderHand/RenderSplitHand";
const Player = ({ state, dispatch }) => {
  return (
    <div id="playerhand">
      <h2>Player 1</h2>
      {!state.handIsSplit ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ padding: "0 10px" }}>
            {state.playerScore !== 0 && state.playerScore <= 21
              ? "Score : " + state.playerScore
              : null}
            {state.playerScore > 21 ? "Score : BUST!" : null}
          </p>
          <p style={{ padding: "0 10px" }}>
            {state.roundStarted ? "Bet: $" + state.betAmount : null}
          </p>
          <p>
            {state.roundStarted ? "Balance: $" + state.playerBalance : null}
          </p>
        </div>
      ) : null}

      {!state.handIsSplit ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderHand playerHands={state.playerHands} />
        </div>
      ) : null}

      {state.handIsSplit ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderSplitHand
            playerHands={state.splitHand}
            state={state}
            dispatch={dispatch}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Player;
