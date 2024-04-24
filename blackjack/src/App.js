import "./App.css";
import BlackjackGame from "./components/BlackJack/BlackJack";
import Header from "./components/Header/header";

function App() {
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
    //const hand = document.getElementById("hand");
    // hand.appendChild(imgElement);
  };

  return (
    <div className="App">
      <Header />
      <h1>Black Jack</h1>
      <BlackjackGame />
    </div>
  );
}

export default App;
