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
      //check to make sure user has enough balance.
      setErrorMsg("NOT ENOUGH FUNDS, REDO BE AMOUNT");
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ padding: "0 10px" }}>Total Bet Amount: ${totalBetAmount}</p>
        <p>Player Balance: ${state.playerBalance}</p>
      </div>
      {state.playerBalance < 501 ? (
        <div>
          <button onClick={() => selectBetAmount(1)}>$1</button>
          <button onClick={() => selectBetAmount(5)}>$5</button>
          <button onClick={() => selectBetAmount(20)}>$20</button>
          <button onClick={() => selectBetAmount(50)}>$50</button>
          <button onClick={() => selectBetAmount(100)}>$100</button>
          <button onClick={() => confirmBet()}>Deal</button>
        </div>
      ) : null}

      {state.playerBalance > 501 ? (
        <div>
          <button onClick={() => selectBetAmount(20)}>$20</button>
          <button onClick={() => selectBetAmount(50)}>$50</button>
          <button onClick={() => selectBetAmount(100)}>$100</button>
          <button onClick={() => selectBetAmount(250)}>$250</button>
          <button onClick={() => selectBetAmount(500)}>$500</button>
          <button onClick={() => confirmBet()}>Deal</button>
        </div>
      ) : null}

      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default BetAmount;
