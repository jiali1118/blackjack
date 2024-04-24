const dealHand = async (deckId, setPlayerHand, setDealerHand) => {
  try {
    console.log("Dealing CARDS!");
    // Fetch a card from the deck for the player
    const playerCard1Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const playerCard1Data = await playerCard1Response.json();
    const playerCard1 = playerCard1Data.cards[0];

    let imageUrl = playerCard1.image;
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    const playercard1 = document.getElementById("playerhand");
    playercard1.appendChild(imgElement);

    // Fetch a card from the deck for the dealer
    const dealerCard1Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const dealerCard1Data = await dealerCard1Response.json();
    const dealerCard1 = dealerCard1Data.cards[0];

    let imageUrl3 = dealerCard1.image;
    const imgElement3 = document.createElement("img");
    imgElement3.src = imageUrl3;
    const dealercard1 = document.getElementById("dealerhand");
    dealercard1.appendChild(imgElement3);

    // Fetch another card from the deck for the player
    const playerCard2Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const playerCard2Data = await playerCard2Response.json();
    const playerCard2 = playerCard2Data.cards[0];

    let imageUrl2 = playerCard2.image;
    const imgElement2 = document.createElement("img");
    imgElement2.src = imageUrl2;
    const playercard2 = document.getElementById("playerhand");
    playercard2.appendChild(imgElement2);
    // Fetch another card from the deck for the dealer
    const dealerCard2Response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const dealerCard2Data = await dealerCard2Response.json();
    const dealerCard2 = dealerCard2Data.cards[0];

    let imageUrl4 = dealerCard2.image;
    const imgElement4 = document.createElement("img");
    imgElement4.src = imageUrl4;
    const dealercard2 = document.getElementById("dealerhand");
    dealercard2.appendChild(imgElement4);

    //Storing player and dealer hand
    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
  } catch (error) {
    console.error("Error dealing hand:", error);
    // Handle error (e.g., display error message to the user)
  }
};

export default dealHand;
