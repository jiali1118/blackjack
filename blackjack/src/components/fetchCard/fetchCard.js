const fetchCard = async (deckID) => {
  try {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    const data = await response.json();
    console.log("fetch Card returns: " + data);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error.message };
  }
};

export default fetchCard;
