import fetchCard from "../utilities/fetchCard";

const double = async (state, dispatch, index) => {
  try {
    const { data, error } = await fetchCard(state.deckId); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    const newBet = state.betAmount + state.betAmount;
    //If hand is not split, do this action.
    if (state.isPlayerTurn && !state.handIsSplit) {
      const updatedHands = [...state.playerHands, data.cards[0]];
      dispatch({ type: "SET_PLAYER_HAND", payload: updatedHands }); //update player's hand
      dispatch({ type: "SET_BET_AMOUNT", payload: newBet }); //update player's bet amount
      dispatch({ type: "SET_PLAYER_TURN", payload: false }); //end player turn
      await new Promise((resolve) => setTimeout(resolve, 500));
      //If player doesn't bust from double, dealerturn starts
      if (state.playerScore <= 21) {
        dispatch({ type: "SET_DEALER_TURN", payload: true });
      }
    }
    if (state.isPlayerTurn && state.handIsSplit) {
      const updatedSplitHand = [...state.splitHand];
      console.log(updatedSplitHand);
      console.log(index);
      console.log(updatedSplitHand[index]);

      updatedSplitHand[index].hand.push(data.cards[0]);
      updatedSplitHand[index].bet += state.betAmount;
      // Create the updated state object
      console.log(updatedSplitHand);
      dispatch({ type: "UPDATE_SPLIT_HAND", payload: updatedSplitHand });
      dispatch({ type: "CALCULATE_SPLIT" });

      //Make sure you don't over increment and reach undefined.
      if (state.currentHandIndex < state.splitHand.length - 1) {
        // Check if the current hand index is less than the maximum index
        dispatch({ type: "INCREMENT_HAND_INDEX" }); // Dispatch an action to increment the index of the current hand
      } else {
        dispatch({ type: "SET_PLAYER_TURN", payload: false });
        dispatch({ type: "SET_DEALER_TURN", payload: true });
      }
    }
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

export default double;
