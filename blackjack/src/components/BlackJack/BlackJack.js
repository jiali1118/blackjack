import React, { useState, useEffect, useReducer } from "react";
import BetAmount from "../BetAmount/BetAmount";
import dealHand from "../DealHand/DealHand";
import calculateHand from "../../utilities/CalculateHand";
import PlayerAction from "../PlayerAction/PlayerAction";
import RenderHand from "../RenderHand/RenderHand";
import dealerTurn from "../../utilities/dealerTurn";
import isSoft17 from "../../utilities/isSoft17";
import hit from "../../utilities/Hit";
import newDeck from "../../utilities/newDeck";
const initialState = {
  gameStarted: false,
  roundStarted: false,
  roundEnded: false,
  betStarted: false,
  deckId: "",
  playerScore: 0,
  dealerScore: 0,
  betAmount: 0,
  playerBalance: 1000,
  playerHands: [],
  dealerHand: [],
};
const BlackjackGame = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DEALER_HAND":
        return {
          ...state,
          playerHands: state.playerHands,
          dealerHand: state.dealerHand,
        };
      case "SET_DECK_ID":
        return { ...state, deckId: action.payload };
      case "BET_PHASE":
        return { ...state, betStarted: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [playerHands, setPlayerHands] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [deckId, setDeckId] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  //Initialize Deck

  const startGame = async () => {
    try {
      console.log("Starting game");
      const newDeckID = await newDeck();
      dispatch({ type: "SET_DECK_ID", payload: newDeckID });
      dispatch({ type: "BET_PHASE", payload: true });
      setDeckId(newDeckID);
      setGameStarted(true);
    } catch (err) {
      console.error(err);
    }
  };

  //When round is started, call these functions
  useEffect(() => {
    if (roundStarted) {
      dealHand(deckId, setPlayerHands, setDealerHand);
      setIsPlayerTurn(true);
    }
  }, [roundStarted, deckId, setPlayerHands, setDealerHand]);

  useEffect(() => {
    calculateHand(playerHands, setPlayerScore);
  }, [playerHands]);
  useEffect(() => {
    calculateHand(dealerHand, setDealerScore);
  }, [dealerHand]);

  useEffect(() => {
    if (isDealerTurn) {
      dealerTurn(
        dealerHand,
        dealerScore,
        setDealerHand,
        deckId,
        setDealerScore,
        setIsDealerTurn
      );
    }
  }, [isDealerTurn]);
  return (
    <div>
      {!gameStarted ? <button onClick={startGame}>Start Game</button> : null}

      <div id="dealerhand">
        <h2>Dealer</h2>
        <p>{dealerScore !== 0 ? "Score : " + dealerScore : null}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderHand playerHands={dealerHand} />
        </div>
      </div>
      {state.betStarted ? (
        <BetAmount setBetAmount={setBetAmount} roundStarted={setRoundStarted} />
      ) : null}
      {isPlayerTurn ? (
        <PlayerAction
          deckId={deckId}
          playerHands={playerHands}
          setPlayerHands={setPlayerHands}
          setBetAmount={setBetAmount}
          setPlayerScore={setPlayerScore}
          setIsPlayerTurn={setIsPlayerTurn}
          setIsDealerTurn={setIsDealerTurn}
        />
      ) : null}
      <div id="playerhand">
        <h2>Player 1</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ padding: "0 10px" }}>
            {playerScore !== 0 ? "Score : " + playerScore : null}
          </p>
          <p>{roundStarted ? "Bet: $" + betAmount : null}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderHand playerHands={playerHands} />
        </div>
      </div>
    </div>
  );
};

export default BlackjackGame;
