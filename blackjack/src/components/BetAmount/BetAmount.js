import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./BetAmount.css";
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
    //check to make sure user has enough balance.
    if (newBalance < 0) {
      setErrorMsg("NOT ENOUGH FUNDS, REDO BE AMOUNT");
      setTotalBetAmount(0);
    } else {
      dispatch({ type: "SET_BET_AMOUNT", payload: totalBetAmount });
      dispatch({ type: "SET_ROUND_STARTED", payload: true });
      dispatch({ type: "BET_PHASE", payload: false });
    }
  };

  return (
    <div>
      <div className="bet-display">
        <p style={{ padding: "0 10px" }}>Total Bet Amount: ${totalBetAmount}</p>
        <p>Player Balance: ${state.playerBalance}</p>
      </div>

      <div>
        <Button variant="dark" onClick={() => selectBetAmount(1)}>
          $1
        </Button>
        <Button variant="dark" onClick={() => selectBetAmount(10)}>
          $10
        </Button>
        <Button variant="dark" onClick={() => selectBetAmount(100)}>
          $100
        </Button>
        <Button variant="dark" onClick={() => selectBetAmount(500)}>
          $500
        </Button>
        {state.playerBalance >= 5000 ? (
          <Button variant="dark" onClick={() => selectBetAmount(5000)}>
            $5000
          </Button>
        ) : null}
        <Button variant="dark" onClick={() => confirmBet()}>
          Deal
        </Button>
      </div>

      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default BetAmount;
