import React, { useEffect, useState } from "react";

import "./BringItRightLogin.css";
import { Link } from "react-router-dom";

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
          <div className="input-with-icon">
            <img
              className="icon-user"
              src="../../../../public/Images/userSymbol.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={userName}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <input
            className="password-Field"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="Login-Button" type="submit">
            LOGIN
          </button>
        </div>

        <div className="links">
          <div className="register">
            <Link to={"/register"}>
              <p>Register</p>
            </Link>
          </div>
          <div className="forgotPW">
            <Link to={"/forgotPassword"}>
              <p>Forgot Password?</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BringItRightLogin;
