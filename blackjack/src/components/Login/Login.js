import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../Header/header";
import { Button } from "react-bootstrap";

function Login({ setUser, setIsLoggedIn }) {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to login. Please try again.");
      }
      const userData = await response.json();
      if (userData.token) {
        console.log("User Data info:", userData);
        document.cookie = `access_token=${userData.token}; path=/;`;
        setUser(userData);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password. Please try again");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
      setErrorMessage("Failed to login. Try to register");
    }
  };
  // if(isLoggedIn) {
  //   return <Redirect to="/"/>
  // }

  return (
    <div>
      <div className="loginpage">
        <form onSubmit={handleSubmit}>
          <h1> Login </h1>
          <div className="input-container">
            <label className="text">Email</label>
            <input
              type="text"
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-container">
            <label className="text">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <a href="/Register">Register</a>
            </p>
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
