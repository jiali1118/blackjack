import React from "react";
import { useState } from "react";

function Login() {
  const [inputEmail, setInputEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form>
        <h1> Login </h1>
        <div>
          <label>Email</label>
          <input type="text" value={inputEmail} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="login">Login</button>
        <div>
          <p>
            Don't have an account? <a href="/Register">Register</a>
          </p>
        </div>
        <p>email: {inputEmail}</p>
        <p>password: {password}</p>
      </form>
    </div>
  );
}

export default Login;
