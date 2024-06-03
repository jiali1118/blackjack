import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("http://localhost:8800/valid-token", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  return (
    <BrowserRouter>
      <Header
        setUser={setUser}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home user={user} isLoggedIn={isLoggedIn} />}
        />
        <Route
          exact
          path="/login"
          element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
