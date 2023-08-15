import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-body">
      <Navbar />
      <Calendar />
      <div className="reservation-header">
        <h1 className="reservation-title">Reservas</h1>
        <button className="new-reservation-btn">Nova reserva</button>
      </div>
      <div className="reservations list">
        <div className="reservation-item">
          <p>item 1</p>
        </div>
        <div className="reservation-item">
          <p>item 2</p>
        </div>
        <div className="reservation-item">
          <p>item 3</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
