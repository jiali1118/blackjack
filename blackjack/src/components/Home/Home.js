import React, { useState } from "react";
import BlackjackGame from "../BlackJack/BlackJack";
import Header from "../Header/header";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";
import { Button } from "react-bootstrap";

function Home(inputEmail) {
  //Leaderboard logic
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
    console.log("Modal clicked");
  };
  const handleClose = () => setShowModal(false);
  return (
    <div className="App">
      <Header />
      <Button variant="primary" onClick={handleShow}>
        Leaderboard
      </Button>
      <LeaderboardModal show={showModal} handleClose={handleClose} />
      <BlackjackGame />
    </div>
  );
}

export default Home;
