import React, { useEffect, useState } from "react";

import "./BringItRightLogin.css";

const BringItRightLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setUserName("");
    setPassword("");
  };

  return (
    <div className="card">
      <div className="logo">
        <img src="../../../../public/Images/bring_it_logo.png"></img>
      </div>

      <form className="singIn-Form" onSubmit={handleLogin}>
        <div className="input-Container">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default BringItRightLogin;
