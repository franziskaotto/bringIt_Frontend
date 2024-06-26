import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./BringItRightLogin.css";
import Logo from "../../Logo/Logo";


// handles user login and stores the JWT token in local storage
const BringItRightLogin = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  // hook to navigate to different routes
  const navigate = useNavigate();

  // Function to handle changes in the input fields and update the credentials state
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const authoHeader = btoa(credentials.username + ":" + credentials.password); // Create a basic authHeader
    console.log(authoHeader);
  
    try {
      // Send a POST request to the login endpoint with the user's credentials
      const response = await fetch("http://localhost:8081/api/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + authoHeader // Include the basic authHeader
        },
        body: JSON.stringify(credentials),
      });
  
      const result = await response.json();
      console.log("Response from login:", result); // Log the result object to see its structure

      if (response.ok) {
        console.log(result);
        // Store the token in local storage
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        // save username to localstorage
        localStorage.setItem("username", credentials.username) 
        console.log(credentials.username)

        // to get username for creating todos
        navigate("/map");
      } else {
        console.error("Login failed", result);
      }
    } catch (error) {
      console.error("Error during login", error);
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

BringItRightLogin.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default BringItRightLogin;
