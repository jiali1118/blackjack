import React, { useState } from "react";
import hit from "../../utilities/hit";
import double from "../../utilities/double";
import split from "../../utilities/split";
import { Button } from "react-bootstrap";

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
      {/*Action for hit*/}
      <Button
        variant="dark"
        onClick={() => {
          hit(state, dispatch, index);
          setHitClicked(true);
        }}
      >
        Hit
      </Button>

      {/*Action for Doubling*/}
      {!hitClicked && canIDouble ? (
        <Button
          variant="dark"
          onClick={() => {
            double(state, dispatch); //sets playerturn to false immediately
          }}
        >
          Double
        </Button>
      ) : null}

      {/*Action for Splitting hand*/}
      {state.playerHands.length >= 2 &&
      state.playerHands[0].value === state.playerHands[1].value ? (
        <Button
          variant="dark"
          onClick={() => {
            split(state, dispatch);
          }}
        >
          Split
        </Button>
      ) : null}

      {/*Action for Standing*/}
      <Button
        variant="dark"
        onClick={() => {
          dispatch({ type: "SET_PLAYER_TURN", payload: false });
          dispatch({ type: "SET_DEALER_TURN", payload: true });
        }}
      >
        Stand
      </Button>
    </div>
  );
}

export default PlayerAction;
