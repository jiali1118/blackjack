import "./App.css";
import Header from "./components/Header/header";

function App() {
  async function newGame() {
    try {
      const deckID = await newDeck();
      getCard(deckID);
    } catch (err) {
      console.error(err);
    }
  }

  //Start a new deck
  const newDeck = async () => {
    try {
      const response = await fetch(
        `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch deck");
      }
      const data = await response.json();
      return data.deck_id;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getCard = async (deckID) => {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    const data = await response.json();
    console.log(data.cards[0].image);
    let imageUrl = data.cards[0].image;
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    // const hand = document.getElementById("hand");
    // hand.appendChild(imgElement);
  };

  return (
    <div className="App">
      <Header />
      <h1>Black Jack</h1>
      <button onClick={newGame}>Start Game</button>
      <div id="dealerhand">
        <h2>Dealer</h2>
      </div>
      <div id="playerhand">
        <h2>Player 1</h2>
      </div>
    </div>
  );
}

export default App;
