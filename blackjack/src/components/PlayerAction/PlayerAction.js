import React from "react";
import Hit from "../Hit/Hit";
import double from "../../utilities/double";
function playerAction(props) {
  return (
    <div>
      <button
        onClick={() => {
          Hit(props.deckId, props.setPlayerHand);
        }}
      >
        Hit
      </button>
      <button
        onClick={() => {
          double(props.deckId, props.setPlayerHand, props.setBetAmount);
        }}
      >
        Double
      </button>
      <button
        onClick={() => {
          console.log("CLICKED!");
        }}
      >
        Stand
      </button>
      {/* {playerHand.hand.length >= 2 &&
      playerHand.hand[0].value === playerHand.hand[1].value ? (
        <button
          onClick={() => {
            console.log("CLICKED!");
          }}
        >
          Split
        </button>
      ) : null} */}
    </div>
  );
}

export default playerAction;
