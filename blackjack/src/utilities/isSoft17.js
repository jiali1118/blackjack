function isSoft17(hand) {
  let hasAce = false;
  let sum = 0;

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === "A") {
      hasAce = true;
    }
    if (
      hand[i].value === "J" ||
      hand[i].value === "Q" ||
      hand[i].value === "K"
    ) {
      sum += 10;
    } else if (hand[i].value !== "A") {
      sum += parseInt(hand[i].value);
    }
  }

  if (hasAce) {
    sum += 11; // Assume the ace is counted as 11 initially
  }

  // Adjust the value of ace from 11 to 1 if needed
  if (hasAce && sum > 21) {
    sum -= 10; // Adjust ace value from 11 to 1
  }

  return hasAce && sum === 17;
}

export default isSoft17;
