import fetchCard from "../fetchCard/fetchCard";

const hit = async (deckID, setPlayerHand) => {
  try {
    const { data, error } = await fetchCard(deckID); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    console.log("Fetched card data:", data.cards[0]);
    // Return the fetched card data
    setPlayerHand((prevPlayerHand) => [...prevPlayerHand, data.cards[0]]);
    return data;
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
};

export default hit;
