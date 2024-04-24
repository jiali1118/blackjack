import React from "react";

function playerAction(playerHand, setBetAmount) {
  return (
    <div>
      <button
        onClick={() => {
          console.log(playerHand.hand[0].value);
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
      {playerHand.hand.length >= 2 &&
      playerHand.hand[0].value === playerHand.hand[1].value ? (
        <button
          onClick={() => {
            console.log("CLICKED!");
          }}
        >
          Split
        </button>
      ) : null}
    </div>
  );
}

export default playerAction;
