import React, { useEffect, useState } from "react";

import "./BringItRightLogin.css";

const BringItRightLogin = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUserName("");
    setPassword("");

    // if(loginStatus) { // überprüfung, ob login erfolgreich
    // }
  setIsLoggedIn(true);

  };

  return (
    <div className="card">
      <div className="logo">
        <img src="../../../../public/Images/bring_it_logo.png"></img>
      </div>

      <form className="singIn-Form" onSubmit={handleLogin}>
        <div className="input-Container">
          <input className="input-Field"
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input className="password-Field"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default BringItRightLogin;
