import React, { useState, useEffect, useReducer } from "react";
import BetAmount from "../BetAmount/BetAmount";
import dealHand from "../DealHand/DealHand";
import calculateHand from "../../utilities/calculateHand";
import PlayerAction from "../PlayerAction/PlayerAction";
import RenderHand from "../RenderHand/RenderHand";
import dealerTurn from "../../utilities/dealerTurn";
import isSoft17 from "../../utilities/isSoft17";
import hit from "../../utilities/hit";
import newDeck from "../../utilities/newDeck";
import Player from "../Player/Player";
import Dealer from "../Dealer/Dealer";
import result from "../../utilities/result";
import Outcome from "../Outcome/Outcome";
const initialState = {
  gameStarted: false,
  roundStarted: false,
  roundEnded: false,
  betStarted: false,
  isPlayerTurn: false,
  isDealerTurn: false,
  deckId: "",
  outCome: "",
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
      case "SET_PLAYER_BALANCE":
        return { ...state, playerBalance: action.payload };
      case "OUTCOME":
        return { ...state, outCome: action.payload };
      case "SET_ROUND_ENDED":
        return { ...state, roundEnded: action.payload };
      case "NEW_ROUND": {
        return {
          ...state,
          isPlayerTurn: false,
          isDealerTurn: false,
          roundStarted: false,
          betStarted: true,
          playerHands: [],
          dealerHand: [],
          roundEnded: false,
          outCome: "",
        };
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

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

  //When hand updates, update score
  useEffect(() => {
    let score = calculateHand(state.playerHands);
    dispatch({ type: "SET_PLAYER_SCORE", payload: score });
  }, [state.playerHands]);
  useEffect(() => {
    let score = calculateHand(state.dealerHand);
    dispatch({ type: "SET_DEALER_SCORE", payload: score });
  }, [state.dealerHand]);

  useEffect(() => {
    if (state.isDealerTurn) {
      console.log("ITS DEALERS TURN");
      dealerTurn(state, dispatch);
    }
  }, [state.isDealerTurn, state.dealerScore]);
  useEffect(() => {
    //If player bust, skip dealer turn, dealer wins
    if (state.playerScore > 21) {
      dispatch({ type: "SET_PLAYER_TURN", payload: false });
      dispatch({ type: "SET_ROUND_ENDED", payload: true });
    }
    if (state.playerScore === 21) {
      dispatch({ type: "SET_PLAYER_TURN", payload: false });
      dispatch({ type: "SET_DEALER_TURN", payload: true });
    }
  }, [state.playerScore]);

  useEffect(() => {
    if (state.roundEnded) {
      result(state, dispatch);
    }
  }, [state.roundEnded]);

  return (
    <div>
      {!state.gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : null}
      <Dealer state={state} dispatch={dispatch} />
      {state.betStarted ? (
        <BetAmount state={state} dispatch={dispatch} />
      ) : null}
      {state.outCome != "" ? (
        <Outcome state={state} dispatch={dispatch} />
      ) : null}
      {state.isPlayerTurn ? (
        <PlayerAction state={state} dispatch={dispatch} />
      ) : null}
      <Player state={state} dispatch={dispatch} />
    </div>
  );
};

export default BlackjackGame;
