import React, { useState } from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import "./stylesheets/Home.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

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
          onClick={() => setVisible(true)}
        />
        <Dialog
          header="Nova Reserva"
          visible={visible}
          style={{ width: "30rem" }}
          onHide={() => setVisible(false)}
          className="modal-dialog"
        >
          <div className="modal-content">
            <form action="#" method="post" className="form-panel">
              <label htmlFor="reservation-room">Sala</label>
              <select name="room" id="reservation-room">
                <option value="sala-1">Sala 1</option>
                <option value="sala-2">Sala 2</option>
                <option value="sala-3">Sala 3</option>
              </select>
              <label htmlFor="reservation-title"> Título</label>
              <input type="text" name="title" id="reservation-title" />
              <div className="reservation-time-box">
                <div className="time-input">
                  <label htmlFor="reservation-start-time"> Início</label>
                  <input
                    type="time"
                    name="start-time"
                    id="reservation-start-time"
                  />
                </div>
                <div className="time-input">
                  <label htmlFor="reservation-end-time"> Término</label>
                  <input
                    type="time"
                    name="end-time"
                    id="reservation-end-time"
                  />
                </div>
              </div>
              <label htmlFor="reservation-desc"> Descrição</label>
              <textarea
                type="text"
                name="desc"
                id="reservation-desc"
                className="reservation-desc"
              />
              <button className="submit-reservation-btn">Reservar</button>
            </form>
          </div>
        </Dialog>
      </div>
      <div className="reservations-list">
        <div className="reservation-item">
          <div className="item-text">
            <h2 className="item-title">Título 1</h2>
            <p className="item-subtitle">Subtitulo 1</p>
          </div>
          <h3 className="item-time">10:00 - 12:30</h3>
        </div>
        <div className="reservation-item">
          <div className="item-text">
            <h2 className="item-title">Título 2</h2>
            <p className="item-subtitle">Subtitulo 2</p>
          </div>
          <h3 className="item-time">10:00 - 12:30</h3>
        </div>
        <div className="reservation-item">
          <div className="item-left">
            <h2 className="item-title">Título 3</h2>
            <p className="item-subtitle">Subtitulo 3</p>
          </div>
          <div className="item-right">
            <h3 className="item-time">10:00 - 12:30</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
