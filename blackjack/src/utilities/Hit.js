import fetchCard from "../components/fetchCard/fetchCard";
import calculateHand from "./calculateHand";

const hit = async (deckID, setPlayerHand, hand, setPlayerScore) => {
  try {
    const { data, error } = await fetchCard(deckID); // Call fetchCard synchronously
    if (error) {
      console.error("Error fetching card:", error);
      return null;
    }
    console.log("Fetched card data:", data.cards[0]);
    // Return the fetched card data
    const updatedHand = [...hand, data.cards[0]];
    setPlayerHand(updatedHand);

    let score = calculateHand(updatedHand, setPlayerScore);

    return score;
  } catch (error) {
    console.error("Error fetching card:", error);
  }
};

export default hit;
