import React, { useState, useEffect } from "react";
import "./header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";

function Header({user, isLoggedIn, setUser, setIsLoggedIn}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignOut = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false); // Update login state to false after signing out
    setUser(null)
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";

  //Leaderboard logic
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
    console.log("Modal clicked");
  };
  const handleClose = () => setShowModal(false);

  return (
    <div className="navbar">
      <h2 className="home-link" onClick={handleHomeClick}>
        Black Jack
      </h2>
      <div className="register">
        <Button variant="primary" onClick={handleShow}>
          Leaderboard
        </Button>
        <LeaderboardModal show={showModal} handleClose={handleClose} />
        {isLoggedIn ? (
          <>
            <div className="nav-item"> {user?.email} </div>
            <div className="nav-item" onClick={handleSignOut}>
              Sign Out
            </div>
          </>
        ) : (
          <>
            {!isLoginPage && <div className="nav-text">Guest</div>}
            {!isLoginPage && (
              <a href="../login" className="nav-item">
                Sign in
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
