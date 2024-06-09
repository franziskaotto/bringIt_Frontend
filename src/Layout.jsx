import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Ellipses from "./Components/Ellipses";
import BringItLeftContent from "./Components/Login/bringItLeftLogin";
import Navbar from "./Components/Navbar";
import BringItRightLogin from "./Components/Login/BringItRightLogin";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  return (
    <>
      <Ellipses />

      {isLoggedIn ? (
        <>
          <Navbar />
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
