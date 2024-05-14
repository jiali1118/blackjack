const splitResult = (state, dispatch) => {
  console.log("CALCULATING RESULTS");
  let resultingBalance = state.playerBalance;
  console.log(resultingBalance);
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
          resultingBalance += hand.bet;
          console.log("Player Wins!");
        } else if (hand.score < state.dealerScore) {
          dealerWins++;
          resultingBalance -= hand.bet;
          console.log("Dealer Wins!");
        } else {
          ties++;
          console.log("Tie!");
        }
      } else {
        playerWins++;
        resultingBalance += hand.bet;
        console.log("Player Wins! Dealer Busts!");
      }
    } else if (state.dealerScore <= 21) {
      dealerWins++;
      resultingBalance -= hand.bet;
      console.log("Dealer Wins! Player Busts!");
    } else {
      ties++;
      console.log("Tie! Both Bust!");
    }
  });

  // Dispatch outcome based on overall result
  if (playerWins > dealerWins) {
    dispatch({ type: "OUTCOME", payload: "Player Wins!" });
  } else if (playerWins < dealerWins) {
    if (resultingBalance <= 0) {
      dispatch({ type: "OUTCOME", payload: "OUT OF FUNDS" });
    } else {
      dispatch({ type: "OUTCOME", payload: "Dealer Wins!" });
    }
  } else {
    dispatch({ type: "OUTCOME", payload: "Tie!" });
  }

  dispatch({ type: "SET_PLAYER_BALANCE", payload: resultingBalance });
  console.log("END CALCULATE RESULT");
};

export default splitResult;
