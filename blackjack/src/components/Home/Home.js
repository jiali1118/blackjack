import React, { useState } from "react";
import BlackjackGame from "../BlackJack/BlackJack";
import Header from "../Header/header";

function Home({user}) {
  return (
    <div className="App">
      <BlackjackGame user={user}/>
    </div>
  );
}

export default Home;
