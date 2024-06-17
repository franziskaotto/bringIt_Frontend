import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./BringItRightLogin.css";
import Logo from "../../Logo/Logo";

const BringItRightLogin = ({ setIsLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsersForLogin = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8081/api/users/");
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        setAllUsers(data);
        console.log(allUsers)
      } catch (error) {
        console.error("Error fetching all users", error);
      }
    };

    fetchAllUsersForLogin();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    checkIfUserExists();
  };

  const checkIfUserExists = () => {
    console.log(loginUserName);
    console.log(loginPassword);
    console.log(allUsers);

    for (let user of allUsers) {
      const userNameDB = user.username;
      console.log(userNameDB + "----usernameDB");
      const passwordDB = user.password;
      console.log(passwordDB + "----passwordDB");

      if (loginUserName === userNameDB && loginPassword === passwordDB) {
        console.log(loginPassword + "     LoginPassword");
        setLoginUserName("");
        setLoginPassword("");
        setIsLoggedIn(true);
        navigate("/map");
        break;
      } else {
        console.log("Not matching");
      }
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="login-card">
      <Logo />

      <form className="singIn-Form" onSubmit={handleLogin}>
        <div className="input-Container">
          <div className="input-with-icon">
            <img
              className="icon-user"
              src="../../../../public/Images/user.png"
            ></img>
            <input
              className="input-Field"
              type="text"
              value={loginUserName}
              placeholder="Username"
              onChange={(e) => setLoginUserName(e.target.value)}
            />
          </div>
          <div className="input-with-icon">
            <img
              className="icon-user"
              src="../../../../public/Images/password.png"
            ></img>
            <input
              className="input-Field"
              type="password"
              value={loginPassword}
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>

          <button className="Login-Button" type="submit">
            LOGIN
          </button>
        </div>

        <div className="links">
          <div className="register">
            <Link to={"/register"} onClick={handleRegister}>
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
