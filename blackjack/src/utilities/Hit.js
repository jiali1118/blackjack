import fetchCard from "../components/fetchCard/fetchCard";

const hit = async (state, dispatch) => {
  try {
    const { data, error } = await fetchCard(state.deckId); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    console.log("Fetched card data:", data.cards[0]);
    // Return the fetched card data
    if (state.isPlayerTurn) {
      const updatedHands = [...state.playerHands, data.cards[0]];
      console.log("Players turn getting card");
      dispatch({ type: "SET_PLAYER_HAND", payload: updatedHands });
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
