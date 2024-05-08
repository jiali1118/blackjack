import React, { useState } from "react";
import Hit from "../../utilities/Hit";
import double from "../../utilities/double";

function PlayerAction({ state, dispatch }) {
  const [hitClicked, setHitClicked] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          Hit(state, dispatch);
          setHitClicked(true);
        }}
      >
        Hit
      </button>
      {/* {!hitClicked ? (
        <button
          onClick={() => {
            double();
          }}
        >
          Double
        </button>
      ) : null} */}

      <button onClick={() => {}}>Stand</button>
      {/* {props.playerHands.length >= 2 &&
      props.playerHands[0].value === props.playerHands[1].value ? (
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

export default PlayerAction;
