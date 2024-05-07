// Dealer.js
import React from "react";

const Dealer = ({ dealerScore, dealerHand }) => {
  return (
    <div id="dealerhand">
      <h2>Dealer</h2>
      <p>{dealerScore !== 0 ? "Score : " + dealerScore : null}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RenderHand playerHands={dealerHand} />
      </div>
    </div>
  );
};

export default Dealer;
