import React, { useState, useEffect } from "react";

const BetAmount = ({ state, dispatch }) => {
  const [totalBetAmount, setTotalBetAmount] = useState(0);

  const selectBetAmount = (amount) => {
    const newTotalBetAmount = totalBetAmount + amount;
    setTotalBetAmount(newTotalBetAmount);
  };

  const confirmBet = () => {
    dispatch({
      type: "SET_BET_AMOUNT",
      payload: totalBetAmount,
    });
    dispatch({ type: "SET_ROUND_STARTED", payload: true });
    dispatch({ type: "BET_PHASE", payload: false });
    let newBalance = state.playerBalance - totalBetAmount;

    dispatch({
      type: "SET_PLAYER_BALANCE",
      payload: newBalance,
    });
  };

  return (
    <div>
      <div>Total Bet Amount: ${totalBetAmount}</div>
      <button onClick={() => selectBetAmount(1)}>Bet $1</button>
      <button onClick={() => selectBetAmount(5)}>Bet $5</button>
      <button onClick={() => selectBetAmount(10)}>Bet $10</button>
      <button onClick={() => selectBetAmount(20)}>Bet $20</button>
      <button onClick={() => confirmBet()}>Deal</button>
    </div>
  );
};

export default BetAmount;
