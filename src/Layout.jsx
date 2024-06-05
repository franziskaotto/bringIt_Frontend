import React, { useState } from "react";
import "./App.css";
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
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <div>
          <BringItLeftContent />
          <BringItRightLogin />
        </div>
      )}

      <Navbar />

      <Outlet />
    </>
  );
}

export default Layout;
