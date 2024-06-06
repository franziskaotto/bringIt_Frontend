import React, { useState } from "react";
import "./Layout.css";
import { Outlet, Link } from "react-router-dom";

import Ellipses from "./Components/Ellipses";
import BringItLeftContent from "./Components/Login/bringItLeftLogin";
import Navbar from "./Components/Navbar";
import BringItRightLogin from "./Components/Login/BringItRightLogin";

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Ellipses />
      <Navbar />
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <>
          <BringItLeftContent />
          <BringItRightLogin isLoggedIn={isLoggedIn}/>
        </>
      )}

      

      <Outlet /> 
    </>
  );
}

export default Layout;
