const splitResult = (state, dispatch) => {
  console.log("CALCULATING RESULTS");
  let losingResult = state.playerBalance - state.betAmount;
  setTimeout(() => {}, 500);

  // Initialize variables to keep track of overall result
  let playerWins = 0;
  let dealerWins = 0;
  let ties = 0;

  // Iterate over each hand in splitHand
  state.splitHand.forEach((hand) => {
    if (hand.score <= 21) {
      if (state.dealerScore <= 21) {
        if (hand.score > state.dealerScore) {
          playerWins++;
          console.log("Player Wins!");
        } else if (hand.score < state.dealerScore) {
          dealerWins++;
          console.log("Dealer Wins!");
        } else {
          ties++;
          console.log("Tie!");
        }
      } else {
        playerWins++;
        console.log("Player Wins! Dealer Busts!");
      }
    } else if (state.dealerScore <= 21) {
      dealerWins++;
      console.log("Dealer Wins! Player Busts!");
    } else {
      ties++;
      console.log("Tie! Both Bust!");
    }
  });

  // Update player balance based on overall result
  state.playerBalance +=
    playerWins * state.betAmount - dealerWins * state.betAmount;

  // Dispatch outcome based on overall result
  if (playerWins > dealerWins) {
    dispatch({ type: "OUTCOME", payload: "Player Wins!" });
  } else if (playerWins < dealerWins) {
    if (losingResult <= 0) {
      dispatch({ type: "OUTCOME", payload: "OUT OF FUNDS" });
    } else {
      dispatch({ type: "OUTCOME", payload: "Dealer Wins!" });
    }
  } else {
    dispatch({ type: "OUTCOME", payload: "Tie!" });
  }

  console.log("END CALCULATE RESULT");
};

export default splitResult;
