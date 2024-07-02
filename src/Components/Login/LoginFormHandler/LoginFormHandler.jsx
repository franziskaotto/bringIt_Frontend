import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./LoginFormHandler.css";
import Logo from "../../Logo/Logo";

const LoginFormHandler = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // State to manage error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const authoHeader = btoa(credentials.username + ":" + credentials.password);

    try {
      const response = await fetch(
        "http://localhost:8081/api/user/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + authoHeader,
          },
          body: JSON.stringify(credentials),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        localStorage.setItem("userId", result.userId.toString());
        localStorage.setItem("username", credentials.username);
        navigate("/home");
      } else {
        // Handle incorrect username or password
        if (response.status === 401) {
          setError("Username oder Passwort falsch. Bitte probiere es nochmal.");
        } else {
          console.error("Login fehlgeschlagen.", result);
          setError("Login fehlgeschlagen. Bitte versuche es nochmal.");
        }
      }
    } catch (error) {
      console.error("Error during login.", error);
      setError("Username oder Passwort falsch.");
    }
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="login-card">
      <Logo />

      <form className="singIn-Form" onSubmit={handleLogin}>
        <div className="input-Container-login">
          <div className="input-with-icon-login">
            <img
              className="icon-user"
              src="../../../../public/Images/user.png"
              alt="user icon"
            />
            <input
              className="input-Field-login"
              type="text"
              name="username"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="input-with-icon-login">
            <img
              className="icon-user"
              src="/Images/password.png"
              alt="password icon"
            />
            <input
              className="input-Field-login"
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button className="Login-Button" type="submit">
            LOGIN
          </button>
        </div>

        {error && (
          <div className="loginWrong-message">
            {error}
            <span className="close-button" onClick={() => setError("")}>
              X
            </span>
          </div>
        )}

        <div className="links">
          <div className="register">
            <Link to={"/register"} onClick={handleRegister}>
              <p>Registrieren</p>
            </Link>
          </div>
          <div className="forgotPW">
            <Link to={"/forgotPassword"}>
              <p>Passwort vergessen?</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

LoginFormHandler.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginFormHandler;
