import React from "react";

// Assuming playerHand is an array containing the fetched card objects
const renderPlayerHand = (playerHand) => {
  return playerHand.map((card, index) => (
    <img
      key={index}
      src={card.image}
      alt={`${card.value} of ${card.suit}`}
      style={{ width: "100px", margin: "5px" }} // Adjust styling as needed
    />
  ));
};

export default renderPlayerHand;
