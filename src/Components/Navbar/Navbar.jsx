import React from "react";
import { useRecoilValue } from "recoil";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import handleLogout from "../Logout/LogoutUser";
import { bringItsState } from "../../state/bringItsState";

const Navbar = () => {
  const username = localStorage.getItem("username"); // Retrieve the username from localStorage
  const bringIts = useRecoilValue(bringItsState);

  return (
    <nav className="navbar">
      <div className="logo-btn">
        <Link to="/home">
          <Logo />
        </Link>
      </div>

      <div className="user-info">
        <h4>
          Willkommen, <strong>{username}</strong>!{" "}
          <em>
            {" "}
            Deine Bring-ITS: <strong>{bringIts}</strong>{" "}
          </em>
        </h4>
        {/* Display the username */}
      </div>

      <div className="right-buttons">
        <div className="profil-btn">
          <Link to="/profil">
            <img src="public/Images/Profil-btn.png" alt="Profile" />
          </Link>
        </div>
        <div className="settings-btn">
          <Link to="/settings">
            <img src="public/Images/Setting-btn.png" alt="Settings" />
          </Link>
        </div>
        <div className="logout-btn">
          <div onClick={handleLogout}>
            <Link to="/">
              <img src="public/Images/logout-btn.png" alt="Logout" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
