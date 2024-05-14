import React from "react";
import RenderHand from "./RenderHand"; // Import the RenderHand component
import PlayerAction from "../PlayerAction/PlayerAction";
import cardBackImage from "../../images/cardBack.png";
import PlayerSplitAction from "../PlayerAction/PlayerSplitAction";
const hidden = {
  code: "hidden",
  image: cardBackImage,
  value: "0",
  suit: "NONE",
};
const RenderSplitHand = ({ playerHands, state, dispatch }) => {
  // const splitHand = [
  //   [hidden, hidden],
  //   [hidden, hidden],
  //   [hidden, hidden],
  //   [hidden, hidden],
  // ];
  // console.log(splitHand);
  return playerHands.map((nestedArray, index) => (
    <div key={index}>
      {/* Use the RenderHand component for each nested array */}
      <PlayerSplitAction state={state} dispatch={dispatch} index={index} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {nestedArray.score > 21 ? (
          <p>Score: BUST! </p>
        ) : (
          <p style={{ padding: "0 10px" }}>Score: {nestedArray.score}</p>
        )}
        <p>Bet: ${nestedArray.bet}</p>
      </div>

      <RenderHand playerHands={nestedArray.hand} />
      {/* Render the score for the current hand */}
    </div>
  ));
};

export default RenderSplitHand;
