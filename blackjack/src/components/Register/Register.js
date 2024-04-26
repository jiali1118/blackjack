import React from "react";
import { useState } from "react";

function Register() {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1> Register </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="text" value={inputEmail} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
        {submitted && !passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}
        <button type="submit">Submit</button>
        <p>email: {inputEmail}</p>
        <p>password: {password}</p>
        <p>confirm: {confirmPassword}</p>
      </form>
    </div>
  );
}

export default Register;
