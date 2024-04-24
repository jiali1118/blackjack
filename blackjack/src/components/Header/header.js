import React from "react";
import "./header.css";


function Header() {
  return (
    <div className="container">
      <h1>Black Jack</h1>
      <div className="register">
        <h3>Guest</h3>
        <a href="../Login"><h3>Sign in</h3></a>
      </div>
    </div>
  );
}

export default Header;
