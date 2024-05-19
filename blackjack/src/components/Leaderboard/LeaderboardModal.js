import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Leaderboard from "./Leaderboard";
const LeaderboardModal = ({ show, handleClose }) => {
  const[users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8800/leaderboard");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (show) {
      fetchUsers();
    }
  }, [show]);


return(
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Leaderboard</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Leaderboard users={users}/>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>);
};

export default LeaderboardModal;
