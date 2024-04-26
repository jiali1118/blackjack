import fetchCard from "../components/fetchCard/fetchCard";

const double = async (deckID, setPlayerHand, setBetAmount) => {
  try {
    const { data, error } = await fetchCard(deckID); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    //console.log("Fetched card data:", data.cards[0]);
    // Return the fetched card data
    setPlayerHand((prevPlayerHand) => [...prevPlayerHand, data.cards[0]]);
    setBetAmount((prevBetAmount) => prevBetAmount * 2);
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

export default double;
