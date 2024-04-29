import React, { useState } from "react";
import Hit from "../Hit/Hit";
import double from "../../utilities/double";

function PlayerAction(props) {
  const [hitClicked, setHitClicked] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          Hit(props.deckId, props.setPlayerHands);
          setHitClicked(true);
        }}
      >
        Hit
      </button>
      {!hitClicked ? (
        <button
          onClick={() => {
            double(props.deckId, props.setPlayerHands, props.setBetAmount);
            props.setIsPlayerTurn(false);
            props.setIsDealerTurn(true);
          }}
        >
          Double
        </button>
      ) : null}

      <button
        onClick={() => {
          props.setIsPlayerTurn(false);
          props.setIsDealerTurn(true);
        }}
      >
        Stand
      </button>
      {props.playerHands.length >= 2 &&
      props.playerHands[0].value === props.playerHands[1].value ? (
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

export default PlayerAction;
