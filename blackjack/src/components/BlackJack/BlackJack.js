import React, { useEffect, useReducer, useState } from "react";
import BetAmount from "../BetAmount/BetAmount";
import dealHand from "../DealHand/DealHand";
import calculateHand from "../../utilities/calculateHand";
import dealerTurn from "../../utilities/dealerTurn";
import newDeck from "../../utilities/newDeck";
import Player from "../Player/Player";
import Dealer from "../Dealer/Dealer";
import result from "../../utilities/result";
import Outcome from "../Outcome/Outcome";
import cardBackImage from "../../images/cardBack.png";
import splitResult from "../../utilities/splitResult";
import "./BlackJack.css";
import LoadUserBalance from "../LoadUserBalance/LoadUserBalance";

const initialState = {
  //Initial game state
  gameStarted: false,
  roundStarted: false,
  roundEnded: false,
  betStarted: false,
  isPlayerTurn: false,
  isDealerTurn: false,
  hidden: true,
  deckId: "",
  outCome: "",
  playerScore: 0,
  dealerScore: 0,
  betAmount: 0,
  playerBalance: 1000,
  playerHands: [],
  dealerHand: [],
  splitHand: [],
  currentHandIndex: 0,
  calculateSplit: true,
  handIsSplit: false,
  dealerHiddenCard: {},
  hiddenCard: {
    code: "hidden",
    image: cardBackImage,
    value: "0",
    suit: "NONE",
  },
};
const BlackjackGame = ({ user }) => {
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
      case "ADD_PLAYER_CARD":
        return {
          ...state,
          playerHands: [...state.playerHands, action.payload],
        };
      case "ADD_DEALER_CARD":
        return {
          ...state,
          dealerHand: [...state.dealerHand, action.payload],
        };
      case "ADD_DEALER_HIDDEN_CARD":
        return {
          ...state,
          dealerHiddenCard: action.payload,
        };
      case "REVEAL_HIDDEN_CARD":
        const newDealerHand = [...state.dealerHand];
        newDealerHand.pop();
        newDealerHand.push(state.dealerHiddenCard);
        return {
          ...state,
          dealerHand: newDealerHand,
          hidden: false,
        };
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
          hidden: true,
          dealerHiddenCard: {},
          splitHand: [],
          handIsSplit: false,
          currentHandIndex: 0,
        };
      }
      case "NEW_GAME": {
        return initialState;
      }
      case "SET_SPLIT_HAND": {
        return { ...state, handIsSplit: action.payload };
      }
      case "UPDATE_SPLIT_HAND": {
        return { ...state, splitHand: action.payload };
      }
      case "CALCULATE_SPLIT": {
        const updatedSplitHand = state.splitHand.map((splitHand) => {
          const score = calculateHand(splitHand.hand);
          return { ...splitHand, score }; // Spread the existing properties and include the updated score
        });

        // Return the updated state with the calculated split hand scores
        return { ...state, splitHand: updatedSplitHand };
      }
      case "INCREMENT_HAND_INDEX": {
        let index = state.currentHandIndex + 1;
        return { ...state, currentHandIndex: index };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //Function to startGame

  const startGame = async () => {
    try {
      console.log("Starting game");
      const newDeckID = await newDeck();
      dispatch({ type: "SET_GAME_STARTED", payload: true });
      dispatch({ type: "SET_DECK_ID", payload: newDeckID });
      dispatch({ type: "BET_PHASE", payload: true });
      if (user && !playerBalanceLoaded) {
        console.log(user.player_balance);
        if (user.player_balance >= 1000) {
          showModal();
          setPlayerBalanceLoaded(true);
        }
      }
    } catch (err) {
      console.error("Error fetching deck ID: " + err);
    }
  };

  // Update player balance
  const updatePlayerBalance = async (newBalance) => {
    try {
      let currUser;
      if (user !== "") {
        currUser = user.email;
      } else {
        throw new Error("FAILED TO RETRIEVE USER DATA");
      }
      const response = await fetch("http://localhost:8800/playerbalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currUser, //double check with login.js page
          newPlayerBalance: newBalance,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update player balance");
      }
    } catch (error) {
      console.error("Failed to fetch from backend", error);
    }
  };

  useEffect(() => {
    //Update this richie
    //Add if statement to check if user is logged in, so this doesn't get called for non-users
    if (user && state.roundEnded) {
      updatePlayerBalance(state.playerBalance);
    }
  }, [state.playerBalance]);

  //After confirming bet, player round starts
  //when round is started, dealHand, then set phase to player's turn
  useEffect(() => {
    if (state.roundStarted) {
      console.log("DEALING HAND");
      dealHand(state, dispatch);
      dispatch({ type: "SET_PLAYER_TURN", payload: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  //Listens for when dealerturn is true
  useEffect(() => {
    if (state.isDealerTurn && !state.hidden) {
      console.log("ITS DEALERS TURN");
      setTimeout(() => {
        dealerTurn(state, dispatch);
      }, 2000);
    }
    if (state.isDealerTurn && state.hidden) {
      dispatch({ type: "REVEAL_HIDDEN_CARD" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isDealerTurn, state.dealerScore]);

  //Upon user score change, check for blackjack or BUST
  useEffect(() => {
    //endround if player has blackjack or bust.
    if (
      state.playerScore > 21 ||
      (state.playerHands.length === 2 && state.playerScore === 21)
    ) {
      setTimeout(() => {
        dispatch({ type: "SET_PLAYER_TURN", payload: false });
        dispatch({ type: "SET_ROUND_ENDED", payload: true });
      }, 1000);
    } else if (state.playerScore === 21) {
      //if player hits and lands 21, start dealer turn immediately
      setTimeout(() => {
        dispatch({ type: "SET_PLAYER_TURN", payload: false });
        dispatch({ type: "SET_DEALER_TURN", payload: true });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.playerScore]);

  //Listens for when round is over, calculate results.
  useEffect(() => {
    if (state.roundEnded && !state.handIsSplit) {
      result(state, dispatch);
    } else if (state.roundEnded && state.handIsSplit) {
      splitResult(state, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.roundEnded]);

  //Checks score for each splithand.
  useEffect(() => {
    if (state.handIsSplit) {
      //if busted
      if (state.splitHand[state.currentHandIndex].score >= 21) {
        if (state.currentHandIndex < state.splitHand.length - 1) {
          // Check if the current hand index is less than the maximum index
          dispatch({ type: "INCREMENT_HAND_INDEX" }); // Dispatch an action to increment the index of the current hand
        } else {
          dispatch({ type: "SET_PLAYER_TURN", payload: false });
          dispatch({ type: "SET_DEALER_TURN", payload: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.splitHand]);

  //Load returning user balance?
  const [loadDataModal, setLoadDataModal] = useState(false);
  const showModal = () => setLoadDataModal(true);
  const closeModal = () => setLoadDataModal(false);
  const [playerBalanceLoaded, setPlayerBalanceLoaded] = useState(false);

  return (
    <div className="board">
      {loadDataModal && state.gameStarted ? (
        <LoadUserBalance
          user={user}
          state={state}
          dispatch={dispatch}
          onClose={closeModal}
        />
      ) : null}

      {state.outCome !== "" ? (
        <Outcome state={state} dispatch={dispatch} />
      ) : null}
      {!state.gameStarted ? (
        <button className="button1" onClick={startGame}>
          Start Game
        </button>
      ) : null}
      {state.gameStarted ? <Dealer state={state} dispatch={dispatch} /> : null}

      {state.betStarted ? (
        <BetAmount state={state} dispatch={dispatch} />
      ) : null}
      {state.gameStarted ? <Player state={state} dispatch={dispatch} /> : null}
    </div>
  );
};

export default BlackjackGame;
