import React, { useState, useReducer } from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";

function PlayerAction({ state, dispatch }) {
  const [hitClicked, setHitClicked] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          hit(state, dispatch);
          setHitClicked(true);
        }}
      >
        Hit
      </button>
      {!hitClicked ? (
        <button
          onClick={() => {
            double(state, dispatch);
            dispatch({ type: "SET_DEALER_TURN", payload: true });
          }}
        >
          Double
        </button>
      ) : null}

      <button
        onClick={() => {
          dispatch({ type: "SET_PLAYER_TURN", payload: false });
          dispatch({ type: "SET_DEALER_TURN", payload: true });
        }}
      >
        Stand
      </button>
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
