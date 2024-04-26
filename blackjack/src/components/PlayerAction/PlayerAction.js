import React from "react";
import Hit from "../Hit/Hit";
function playerAction(props) {
  return (
    <div>
      <button
        onClick={() => {
          console.log(props.deckId);
          Hit(props.deckId, props.setPlayerHand);
        }}
      >
        Hit
      </button>
      <button
        onClick={() => {
          console.log("CLICKED!");
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
