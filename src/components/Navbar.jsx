import React from "react";
import "../routes/stylesheets/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-body">
      <div className="logo">
        <h1 className="logo-text">MESTRE SALA</h1>
      </div>
      <div className="dropdown">⬜</div>
    </div>
  );
};

export default Navbar;
