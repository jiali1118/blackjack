import React from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";
import split from "../../utilities/split";
import { Button } from "react-bootstrap";

function PlayerSplitAction({ state, dispatch, index }) {
  //Boolean to keep track of hand actions.
  const isCurrentHand = state.currentHandIndex === index && state.isPlayerTurn;
  const canDouble = state.playerBalance - state.betAmount * 2 > 0;
  //Function to handle when stand action based on which hand the index is on.
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
      <Button
        variant="dark"
        onClick={() => {
          hit(state, dispatch, index);
        }}
        disabled={!isCurrentHand}
      >
        Hit
      </Button>

      {/* Double button logic  */}
      {state.splitHand[index].hand.length === 2 ? (
        <Button
          variant="dark"
          onClick={() => {
            double(state, dispatch, index); //sets playerturn to false immediately
          }}
          disabled={!isCurrentHand}
        >
          Double
        </Button>
      ) : null}

      {state.splitHand[index].hand.length === 2 &&
      state.splitHand[index].hand[0].value ===
        state.splitHand[index].hand[1].value ? (
        <Button
          variant="dark"
          onClick={() => {
            split(state, dispatch, index);
          }}
          disabled={!isCurrentHand}
        >
          Split
        </Button>
      ) : null}

      {/*Action for Standing*/}
      <Button variant="dark" onClick={handleStand} disabled={!isCurrentHand}>
        Stand
      </Button>
    </div>
  );
}

export default PlayerSplitAction;
