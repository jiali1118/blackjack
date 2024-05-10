const newDeck = async () => {
  try {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch deck");
    }
    const data = await response.json();
    console.log("Deck Loaded: " + data.deck_id);
    return data.deck_id;
  } catch (err) {
    console.error("Error loading deck:", err);
  }
};

export default newDeck;
