import React, { useState, useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8800/user-info", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setEmail(userData.email);
          setIsLoggedin(true);
        } else {
          setIsLoggedin(false);
        }
      } catch (error) {
        console.error("Issue getting user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSignOut = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Black Jack</h1>
      <div className="register">
        {isLoggedIn ? (
          <>
            <h3> {email} </h3>
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
          <h3>Guest</h3>
          <a href="../Login">
            <h3>Sign in</h3>
          </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
