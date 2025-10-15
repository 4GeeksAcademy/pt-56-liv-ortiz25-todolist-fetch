import React, { useState } from "react";
import Home from "./Home";

const User = () => {
  const [username, setUsername] = useState("");
  const [isUserCreated, setIsUserCreated] = useState(false);

  const createUser = async () => {
    if (!username.trim()) {
      alert("Please enter a valid username.");
      return;
    }

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok || response.status === 400) {
        setIsUserCreated(true);
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
  <div className="user-container">
    {!isUserCreated ? (
      <div className="user-card">
        <h1 className="user-title">To-Do List</h1>

        <div className="user-form">
          <input
            type="text"
            placeholder="Enter your username"
            className="user-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button className="user-button" onClick={createUser}>
            Create or load user
          </button>
        </div>
      </div>
    ) : (
      <Home userInput={username} />
    )}
  </div>
);
};

export default User;
