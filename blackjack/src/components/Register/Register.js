import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if passwords match whenever password changes
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match whenever confirm password changes
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (password !== confirmPassword) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8800/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      console.log(response);

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Email already exists. Try logging in.");
        } else {
          throw new Error("Failed to fetch registered user");
        }
      }
      const userData = await response.json();
      console.log(userData);
      navigate("/");
    } catch (error) {
      console.error("Error registering user", error);
      setErrorMessage(error.message);
    }
  };

  console.log(inputEmail, password, confirmPassword);

  return (
    <div className="register-page">

      <form onSubmit={handleSubmit}>
      <h1> Register </h1>
        <div className="input-container">
          <label className ="text">Email</label>
          <input
            type="text"
            name="email"
            value={inputEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-container">
          <label className ="text">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Submit</button>
        <div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
        {submitted && !passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}

      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Register;
