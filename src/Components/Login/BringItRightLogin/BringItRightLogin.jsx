import React, { useEffect, useState } from "react";

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
      <div className="logo"></div>

      <div className="login">
        <form className="singIn-Form" onSubmit={handleLogin}>
          <div>
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
    </div>
  );
};

export default BringItRightLogin;
