import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      
      <nav>
        <Link to="/">
          <button>BringItLogo</button>
        </Link>
        <Link to="/User">
          <button type="button">User</button>
        </Link>

        <Link to="/Settings">
          <button type="button">Settings</button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar