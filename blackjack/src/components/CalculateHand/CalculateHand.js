import React from "react";
import dealHand from "../DealHand/DealHand";

function calculateHand(hand, setScore) {
  let total = 0;
  let hasAce = false;

  for (let card of hand) {
    if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK"
    ) {
      total += 10;
    } else if (card.value === "ACE") {
      hasAce = true;
      total += 1; // Add 1 for now; we'll adjust it later if needed
    } else {
      total += parseInt(card.value, 10);
    }
  }

  // If there's an Ace and adding 10 doesn't bust, treat Ace as 11
  if (hasAce && total + 10 <= 21) {
    total += 10;
  }
  setScore(total);
  return total;
}

export default calculateHand;
