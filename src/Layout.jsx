import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Ellipses from "./Components/Ellipses";
import BringItLeftContent from "./Components/Login/bringItLeftLogin";
import Navbar from "./Components/Navbar";
import BringItRightLogin from "./Components/Login/BringItRightLogin";
import { useLocation } from "react-router-dom";


function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const noNavbarRoutes = ["/", "/register", "/readMore"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);



  console.log(isLoggedIn);

  return (
    <>
      <Ellipses />

      {isLoggedIn ? (
        <>
          {showNavbar && <Navbar />}
        
          <Outlet context={{ setIsLoggedIn }} />
        </>
      ) : (
        <>
          <BringItLeftContent setIsLoggedIn={setIsLoggedIn} />
          <BringItRightLogin setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </>
  );
}

export default Layout;


