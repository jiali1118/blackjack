import React, { useState, useEffect, useReducer } from "react";
import BetAmount from "../BetAmount/BetAmount";
import dealHand from "../DealHand/DealHand";
import calculateHand from "../../utilities/calculateHand";
import PlayerAction from "../PlayerAction/PlayerAction";
import RenderHand from "../RenderHand/RenderHand";
import dealerTurn from "../../utilities/dealerTurn";
import isSoft17 from "../../utilities/isSoft17";
import hit from "../../utilities/Hit";
import newDeck from "../../utilities/newDeck";
import Player from "../Player/Player";
import Dealer from "../Dealer/Dealer";
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
      case "SET_DECK_ID":
        return { ...state, deckId: action.payload };
      case "BET_PHASE":
        return { ...state, betStarted: action.payload };
      case "SET_BET_AMOUNT":
        return { ...state, betAmount: action.payload };
      case "SET_ROUND_STARTED":
        return { ...state, roundStarted: action.payload };
      case "SET_GAME_STARTED":
        return { ...state, gameStarted: action.payload };
      case "SET_PLAYER_HAND":
        return { ...state, playerHands: action.payload };
      case "SET_DEALER_HAND":
        return { ...state, dealerHand: action.payload };
      case "SET_PLAYER_TURN":
        return { ...state, isPlayerTurn: action.payload };
      case "SET_DEALER_TURN":
        return { ...state, isDealerTurn: action.payload };
      case "SET_PLAYER_SCORE":
        return { ...state, playerScore: action.payload };
      case "SET_DEALER_SCORE":
        return { ...state, dealerScore: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playerHands, setPlayerHands] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [deckId, setDeckId] = useState("");
  const [dealerScore, setDealerScore] = useState(0);
  //Initialize Deck
  const startGame = async () => {
    try {
      console.log("Starting game");
      const newDeckID = await newDeck();
      dispatch({ type: "SET_GAME_STARTED", payload: true });
      dispatch({ type: "SET_DECK_ID", payload: newDeckID });
      dispatch({ type: "BET_PHASE", payload: true });
    } catch (err) {
      console.error(err);
    }
  };

  //When round is started, call these functions
  useEffect(() => {
    if (state.roundStarted) {
      console.log("DEALING HAND");
      dealHand(state, dispatch);
      dispatch({ type: "SET_PLAYER_TURN", payload: true });
    }
  }, [state.roundStarted]);

  useEffect(() => {
    let score = calculateHand(state.playerHands);
    dispatch({ type: "SET_PLAYER_SCORE", payload: score });
  }, [state.playerHands]);
  useEffect(() => {
    let score = calculateHand(state.dealerHand);
    dispatch({ type: "SET_DEALER_SCORE", payload: score });
  }, [state.dealerHand]);

  useEffect(() => {
    if (isDealerTurn) {
      dealerTurn();
    }
  }, [isDealerTurn]);
  console.log(state.dealerHand);
  return (
    <div>
      {!state.gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : null}
      <Dealer state={state} dispatch={dispatch} />
      {state.betStarted ? (
        <BetAmount state={state} dispatch={dispatch} />
      ) : null}
      {state.isPlayerTurn ? <PlayerAction /> : null}
      <Player state={state} dispatch={dispatch} />
    </div>
  );
};

export default BlackjackGame;
