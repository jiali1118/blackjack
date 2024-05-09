import React, { useState } from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";

function PlayerAction({ state, dispatch }) {
  const canDouble = () => {
    let doubleBet = state.betAmount * 2;
    if (state.playerBalance - doubleBet < 0) {
      return false;
    }
    return true;
  };
  console.log(canDouble());
  const canIDouble = canDouble();
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
      {!hitClicked && canIDouble ? (
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
