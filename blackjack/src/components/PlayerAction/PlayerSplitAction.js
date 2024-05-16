import React, { useState } from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";
import split from "../../utilities/split";
function PlayerSplitAction({ state, dispatch, index }) {
  // const canDouble = () => {
  //   let doubleBet = state.betAmount + state.betAmount;
  //   if (state.playerBalance - doubleBet < 0) {
  //     return false;
  //   }
  //   return true;
  // };
  // const canIDouble = canDouble();
  // const [hitClicked, setHitClicked] = useState(false);
  const isCurrentHand = state.currentHandIndex === index && state.isPlayerTurn;
  const handleStand = () => {
    if (state.currentHandIndex < state.splitHand.length - 1) {
      // Check if the current hand index is less than the maximum index
      dispatch({ type: "INCREMENT_HAND_INDEX" }); // Dispatch an action to increment the index of the current hand
    } else {
      dispatch({ type: "SET_PLAYER_TURN", payload: false });
      dispatch({ type: "SET_DEALER_TURN", payload: true });
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          hit(state, dispatch, index);
          // setHitClicked(true);
        }}
        disabled={!isCurrentHand}
      >
        Hit
      </button>

      {/* Double button logic  */}
      {state.splitHand[index].hand.length === 2 ? (
        <button
          onClick={() => {
            double(state, dispatch, index); //sets playerturn to false immediately
          }}
          disabled={!isCurrentHand}
        >
          Double
        </button>
      ) : null}

      {state.splitHand[index].hand.length === 2 &&
      state.splitHand[index].hand[0].value ===
        state.splitHand[index].hand[1].value ? (
        <button
          onClick={() => {
            split(state, dispatch, index);
          }}
          disabled={!isCurrentHand}
        >
          Split
        </button>
      ) : null}

      {/*Action for Standing*/}
      <button onClick={handleStand} disabled={!isCurrentHand}>
        Stand
      </button>
    </div>
  );
}

export default PlayerSplitAction;
