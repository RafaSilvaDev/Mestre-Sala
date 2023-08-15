import React, { useState } from "react";
import "../routes/stylesheets/Navbar.css";
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showAnimated2, setShowAnimated2] = useState(false);

  return (
    <div className="navbar-body">
      <MDBNavbar className="nav-menu">
        <MDBContainer fluid>
          <div className="logo">
            <h1 className="logo-text">MESTRE SALA</h1>
          </div>
          <MDBNavbarToggler
            type="button"
            className="ms-auto"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowAnimated2(!showAnimated2)}
          >
            <div className={`animated-icon2 ${showAnimated2 && "open"}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>

      <MDBCollapse show={showAnimated2}>
        <div className="navbar-content">
          <h3>Link 1</h3>
          <h3>Link 2</h3>
          <Link to="/login">Sair</Link>
        </div>
      </MDBCollapse>
    </div>
  );
};

export default Navbar;
