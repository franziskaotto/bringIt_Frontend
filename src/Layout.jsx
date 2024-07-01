import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

import Ellipses from "./Components/Ellipses";
import Navbar from "./Components/Navbar";
import LoginFormHandler from "./Components/Login/LoginFormHandler";
import WelcomeInfoSection from "./Components/Login/WelcomeInfoSection";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const noNavbarRoutes = ["/", "/register", "/readMore"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  console.log(isLoggedIn);

  return (
    <>
    <div className="ellipses">
      <Ellipses />

    </div>

      {isLoggedIn ? (
        <>
          {showNavbar && <Navbar />}

          <Outlet context={{ setIsLoggedIn }} />
        </>
      ) : (
        <div className="major-container">
            <WelcomeInfoSection setIsLoggedIn={setIsLoggedIn} />
            <LoginFormHandler setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </>
  );
}

export default Layout;