import React from "react";
import { Button } from "react-bootstrap";
import "./LoadUserBalance.css";

const LoadUserBalance = ({ state, dispatch, onClose }) => {
  const newBalance = () => {
    dispatch({ type: "SET_PLAYER_BALANCE", payload: 1000 });
    onClose();
  };
  const loadData = () => {
    dispatch({ type: "SET_PLAYER_BALANCE", payload: 10000 });
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modall2">
        <div className="modal-content">
          <h2 className="outcome-text">Resume</h2>
          <h2 className="dollar">$100000</h2>
          <div className="button-container">
            <Button variant="danger" onClick={newBalance}>
              Start New Game
            </Button>
            <button className="loadb"></button>
            <Button variant="success" onClick={loadData}>
              Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadUserBalance;
