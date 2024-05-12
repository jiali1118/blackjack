import React, { useState } from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";
import split from "../../utilities/split";
function PlayerAction({ state, dispatch, index }) {
  const canDouble = () => {
    let doubleBet = state.betAmount * 2;
    if (state.playerBalance - doubleBet < 0) {
      return false;
    }
    return true;
  };
  const canIDouble = canDouble();
  const [hitClicked, setHitClicked] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          hit(state, dispatch, index);
          setHitClicked(true);
        }}
      >
        Hit
      </button>
      {!hitClicked && canIDouble ? (
        <button
          onClick={() => {
            double(state, dispatch); //sets playerturn to false immediately
          }}
        >
          Double
        </button>
      ) : null}
      {/* {state.playerHands.length >= 2 &&
      state.playerHands[0].value === state.playerHands[1].value ? (
        
      ) : null} */}
      <button
        onClick={() => {
          split(state, dispatch);
        }}
      >
        Split
      </button>

      {/*Action for Standing*/}
      <button
        onClick={() => {
          dispatch({ type: "SET_PLAYER_TURN", payload: false });
          dispatch({ type: "SET_DEALER_TURN", payload: true });
        }}
      >
        Stand
      </button>
    </div>
  );
}

export default PlayerAction;
