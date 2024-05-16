import React from "react";
import BlackjackGame from "../BlackJack/BlackJack";
import Header from "../Header/header";

function Home(inputEmail) {
  return (
    <div className="App">
      <Header />
      <BlackjackGame />
    </div>
  );
}

export default Home;
