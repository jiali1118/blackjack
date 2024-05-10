const result = (state, dispatch) => {
  console.log("CALCULATING RESULTS");
  let losingResult = state.playerBalance - state.betAmount;
  if (state.playerScore <= 21) {
    if (state.dealerScore <= 21) {
      if (state.playerScore > state.dealerScore) {
        state.playerBalance += state.betAmount;
        dispatch({ type: "OUTCOME", payload: "Player Wins!" });
        console.log("Player Wins!");
      } else if (state.playerScore < state.dealerScore) {
        //Dealer wins
        state.playerBalance -= state.betAmount;
        if (losingResult === 0) {
          dispatch({ type: "OUTCOME", payload: "OUT OF FUNDS" });
        } else {
          dispatch({ type: "OUTCOME", payload: "Dealer Wins!" });
          console.log("Dealer Wins!");
        }
      } else {
        dispatch({ type: "OUTCOME", payload: "DEALER PUSHED" });
        console.log("Tie!");
      }
    } else {
      state.playerBalance += state.betAmount;
      dispatch({ type: "OUTCOME", payload: "Player Wins! Dealer Busts!" });
      console.log("Player Wins! Dealer Busts!");
    }
  } else if (state.dealerScore <= 21) {
    state.playerBalance -= state.betAmount;
    if (losingResult === 0) {
      dispatch({ type: "OUTCOME", payload: "OUT OF FUNDS" });
    } else {
      dispatch({ type: "OUTCOME", payload: "Dealer Wins! Player Busts!" }); //Dealer wins
      console.log("Dealer Wins! Player Busts!");
    }
  } else {
    dispatch({ type: "OUTCOME", payload: "Tie! Both Bust!" });
    console.log("Tie! Both Bust!");
  }

  console.log("END CALCULATE RESULT");
};
export default result;
