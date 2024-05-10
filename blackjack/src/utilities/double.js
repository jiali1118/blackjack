import fetchCard from "../components/fetchCard/fetchCard";

const double = async (state, dispatch) => {
  try {
    const { data, error } = await fetchCard(state.deckId); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    // Return the fetched card data
    const updatedHands = [...state.playerHands, data.cards[0]];
    const newBet = state.betAmount * 2;
    dispatch({ type: "SET_PLAYER_HAND", payload: updatedHands }); //update player's hand
    dispatch({ type: "SET_BET_AMOUNT", payload: newBet }); //update player's bet amount
    dispatch({ type: "SET_PLAYER_TURN", payload: false }); //end player turn
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (state.playerScore <= 21) {
      dispatch({ type: "SET_DEALER_TURN", payload: true });
    }
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

export default double;
