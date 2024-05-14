import fetchCard from "../utilities/fetchCard";

const hit = async (state, dispatch, index) => {
  try {
    const { data, error } = await fetchCard(state.deckId); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    console.log("Fetched card data:", data.cards[0]);
    // Return the fetched card data
    if (state.isPlayerTurn && !state.handIsSplit) {
      const updatedHands = [...state.playerHands, data.cards[0]];
      console.log("Players turn getting card");
      dispatch({ type: "SET_PLAYER_HAND", payload: updatedHands });
    }
    //Updating split hand.
    if (state.isPlayerTurn && state.handIsSplit) {
      const updatedSplitHand = [...state.splitHand];
      updatedSplitHand[index] = updatedSplitHand[index] || {
        hand: [],
        score: 0,
        balance: 0,
      };
      //updatedSplitHand[index] = [...updatedSplitHand[index], data.cards[0]];
      updatedSplitHand[index].hand.push(data.cards[0]);
      // Create the updated state object
      console.log(updatedSplitHand);
      dispatch({ type: "UPDATE_SPLIT_HAND", payload: updatedSplitHand });
      dispatch({ type: "CALCULATE_SPLIT" });
      console.log("Player's turn, getting card for hand at index:", index);
    }
    if (state.isDealerTurn) {
      const updatedHands = [...state.dealerHand, data.cards[0]];
      dispatch({ type: "SET_DEALER_HAND", payload: updatedHands });
      console.log("DEALER TURN HITTING");
    }
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

export default hit;
