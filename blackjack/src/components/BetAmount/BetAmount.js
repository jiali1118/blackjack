import React, { useState, useEffect } from "react";

const BetAmount = (props) => {
  const [totalBetAmount, setTotalBetAmount] = useState(0);

  const selectBetAmount = (amount) => {
    const newTotalBetAmount = totalBetAmount + amount;
    setTotalBetAmount(newTotalBetAmount);
    props.setBetAmount(newTotalBetAmount);
  };

  return (
    <div>
      <div>Total Bet Amount: ${totalBetAmount}</div>
      <button onClick={() => selectBetAmount(1)}>Bet $1</button>
      <button onClick={() => selectBetAmount(5)}>Bet $5</button>
      <button onClick={() => selectBetAmount(10)}>Bet $10</button>
      <button onClick={() => selectBetAmount(20)}>Bet $20</button>
      <button onClick={() => props.roundStarted(true)}>Deal</button>
    </div>
  );
};

export default BetAmount;
