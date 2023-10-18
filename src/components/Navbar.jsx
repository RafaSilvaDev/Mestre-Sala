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
            <Link className="logo-text" to="/">MESTRE SALA</Link>
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
          <Link className="navbar-link" to="/home">Home</Link>
          <Link className="navbar-link" to="">Minhas Reservas</Link>
          <Link className="navbar-link" to="/rooms">Salas</Link>
          <Link className="navbar-link" to="/">Sair</Link>
        </div>
      </MDBCollapse>
    </div>
  );
};

export default Navbar;
