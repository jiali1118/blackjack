import React from "react";
import { useState } from "react";

function Register() {
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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

  return (
    <div>
      <h1> Register </h1>
      <form>
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
        {!passwordsMatch && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
