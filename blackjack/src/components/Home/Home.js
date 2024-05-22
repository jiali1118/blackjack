import React, { useState } from "react";
import BlackjackGame from "../BlackJack/BlackJack";
import Header from "../Header/header";

function Home() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Header setUser={setUser} />
      <BlackjackGame user={user} />
    </div>
  );
}

export default Home;
