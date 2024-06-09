import React, { useEffect, useState } from "react";

import "./BringItRightLogin.css";
import { Link } from "react-router-dom";
import Logo from "../../Logo/Logo";


const BringItRightLogin = ({ setIsLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    checkIfUserExists()
    setUserName("");
    setPassword("");

    // if(loginStatus) { // überprüfung, ob login erfolgreich
    // }
    // setIsLoggedIn(true);
  };

  const checkIfUserExists = () => {
    console.log(userName)
    console.log(password)
    
  }
  useEffect(() => {
    const fetchAllUsersForLogin = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8081/api/users/")
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching all users", error);
      }
    }

    fetchAllUsersForLogin()
  }, [])

  // console.log("Username: " + userName)
  // console.log("Password: " + password)

  return (
    <div className="card">
      <Logo />

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
