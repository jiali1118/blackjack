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
      <RenderHand playerHands={nestedArray.hand} />
      {/* Render the score for the current hand */}
      {nestedArray.score > 21 ? (
        <p>Score: BUST!</p>
      ) : (
        <p>Score: {nestedArray.score}</p>
      )}
    </div>
  ));
};

export default RenderSplitHand;
