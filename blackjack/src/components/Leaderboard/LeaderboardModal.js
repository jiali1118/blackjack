import React from "react";
import { Modal, Button } from "react-bootstrap";
import Leaderboard from "./Leaderboard";
const LeaderboardModal = ({ show, handleClose }) => {
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Leaderboard</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Leaderboard />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>;
};

export default LeaderboardModal;
