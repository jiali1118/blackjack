// Dealer.js
import React from "react";
import RenderHand from "../RenderHand/RenderHand";
const Dealer = ({ state, dispatch }) => {
  return (
    <div id="dealerhand">
      <h2>Dealer</h2>
      <p>{state.dealerScore !== 0 ? "Score : " + state.dealerScore : null}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RenderHand playerHands={state.dealerHand} />
      </div>
    </div>
  );
};

export default Dealer;
