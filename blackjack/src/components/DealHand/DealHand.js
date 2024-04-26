const dealHand = async (deckId, setPlayerHand, setDealerHand) => {
  try {
    console.log("Dealing CARDS!");
    // Fetch a card from the deck for the player
    const playerCard1Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const playerCard1Data = await playerCard1Response.json();
    const playerCard1 = playerCard1Data.cards[0];

    // Fetch a card from the deck for the dealer
    const dealerCard1Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const dealerCard1Data = await dealerCard1Response.json();
    const dealerCard1 = dealerCard1Data.cards[0];

    // Fetch another card from the deck for the player
    const playerCard2Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const playerCard2Data = await playerCard2Response.json();
    const playerCard2 = playerCard2Data.cards[0];

    // Fetch another card from the deck for the dealer
    const dealerCard2Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const dealerCard2Data = await dealerCard2Response.json();
    const dealerCard2 = dealerCard2Data.cards[0];

    //Storing player and dealer hand
    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
  } catch (error) {
    console.error("Error dealing hand:", error);
    // Handle error (e.g., display error message to the user)
  }
};

export default dealHand;
