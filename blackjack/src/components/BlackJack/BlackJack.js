import React, { useState, useEffect } from "react";
import BetAmount from "../BetAmount/BetAmount";
import dealHand from "../DealHand/DealHand";
import calculateHand from "../CalculateHand/CalculateHand";
import PlayerAction from "../PlayerAction/PlayerAction";
import renderPlayerHand from "../renderHand/renderHand";
const BlackjackGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [outcome, setOutcome] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [deckId, setDeckId] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  //Initialize Deck
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
  const startGame = async () => {
    try {
      const newDeckID = await newDeck();
      setDeckId(newDeckID);
      setGameStarted(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (roundStarted) {
      dealHand(deckId, setPlayerHand, setDealerHand);
      setIsPlayerTurn(true);
    }
  }, [roundStarted, deckId, setPlayerHand, setDealerHand]);

  useEffect(() => {
    calculateHand(playerHand, setPlayerScore);
  }, [playerHand]);
  useEffect(() => {
    calculateHand(dealerHand, setDealerScore);
  }, [dealerHand]);

  console.log(playerHand);
  return (
    <div>
      {!gameStarted ? <button onClick={startGame}>Start Game</button> : null}

      <div id="dealerhand">
        <h2>Dealer</h2>
        <p>{dealerScore !== 0 ? "Score : " + dealerScore : null}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderPlayerHand(dealerHand)}
        </div>
      </div>
      {gameStarted && !roundStarted ? (
        <BetAmount setBetAmount={setBetAmount} roundStarted={setRoundStarted} />
      ) : null}
      {isPlayerTurn ? (
        <PlayerAction
          deckId={deckId}
          setPlayerHand={setPlayerHand}
          setBetAmount={setBetAmount}
        />
      ) : null}
      <div id="playerhand">
        <h2>Player 1</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ padding: "0 10px" }}>
            {playerScore !== 0 ? "Score : " + playerScore : null}
          </p>
          <p>{roundStarted ? "Bet: $" + betAmount : null}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderPlayerHand(playerHand)}
        </div>
      </div>
    </div>
  );
};

export default BlackjackGame;
