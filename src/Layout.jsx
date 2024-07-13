import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // Adjust body overflow based on content height
    const body = document.querySelector("body");
    if (body.scrollHeight > window.innerHeight) {
      body.style.overflowY = "scroll";
    } else {
      body.style.overflowY = "hidden";
    }
  }, []);


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
           {/* <div className="scrollable-container">
            <WelcomeInfoSection setIsLoggedIn={setIsLoggedIn} />
          </div>
          Scrollable container for LoginFormHandler 
          <div className="scrollable-container">
            <LoginFormHandler setIsLoggedIn={setIsLoggedIn} />
          </div> */} 
        </div>
      )}
    </>
  );
}

export default Layout;
