import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

import Ellipses from "./Components/Ellipses";
import BringItLeftContent from "./Components/Login/bringItLeftLogin";
import Navbar from "./Components/Navbar";
import BringItRightLogin from "./Components/Login/BringItRightLogin";

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
          <div className="left-container">
            <BringItLeftContent setIsLoggedIn={setIsLoggedIn} />
          </div>
          <div className="right-container">
            <BringItRightLogin setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
