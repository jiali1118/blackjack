import React, { useState, useEffect } from "react";

const BetAmount = ({ state, dispatch }) => {
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const selectBetAmount = (amount) => {
    const newTotalBetAmount = totalBetAmount + amount;
    setTotalBetAmount(newTotalBetAmount);
    setErrorMsg("");
  };

  const confirmBet = () => {
    let newBalance = state.playerBalance - totalBetAmount;
    if (newBalance < 0) {
      setErrorMsg("NOT ENOUGH FUNDS");
      setTotalBetAmount(0);
    } else {
      dispatch({
        type: "SET_BET_AMOUNT",
        payload: totalBetAmount,
      });
      dispatch({ type: "SET_ROUND_STARTED", payload: true });
      dispatch({ type: "BET_PHASE", payload: false });
      dispatch({
        type: "SET_PLAYER_BALANCE",
        payload: newBalance,
      });
    }
  };

  return (
    <div>
      <div>Total Bet Amount: ${totalBetAmount}</div>
      <div>Player Balance: ${state.playerBalance}</div>

      <button onClick={() => selectBetAmount(1)}>Bet $1</button>
      <button onClick={() => selectBetAmount(5)}>Bet $5</button>
      <button onClick={() => selectBetAmount(10)}>Bet $10</button>
      <button onClick={() => selectBetAmount(20)}>Bet $20</button>
      <button onClick={() => selectBetAmount(100)}>Bet $100</button>
      <button onClick={() => confirmBet()}>Deal</button>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default BetAmount;
