import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo-btn">
          <Link to="/map">
            <Logo />
          </Link>
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
