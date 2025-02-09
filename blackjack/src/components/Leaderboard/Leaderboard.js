import React from "react";
import { Modal, Button } from "react-bootstrap";
const Leaderboard = ({ users }) => {
  return (
    <div>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} : ${user.highest_balance}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
