import React, { useState } from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';   

const Home = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="home-body">
      <Navbar />
      <Calendar />
      <div className="reservation-header">
        <h1 className="reservation-title">Reservas</h1>
        <Button
          label="Nova reserva"
          className="new-reservation-btn"
          icon="pi pi-external-link"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Header"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
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
