import React, { useState } from "react";
import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import Data from "../../db/mockdb.json";
import "./stylesheets/Home.css";
import "react-calendar/dist/Calendar.css";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Home = () => {
  const data = Data.reservation;
  const todayDate = new Date().toISOString().substring(0, 10);
  const [reservations, setReservations] = useState(
    data.filter((reservation) => reservation.date.includes(todayDate))
  );
  const [visibleReservations, setVisibleReservations] = useState(
    Array(reservations.length).fill(false)
  );
  const [visibleNewReservation, setVisibleNewReservation] = useState(false);

  const handleDayClick = (value) => {
    const newReservations = data.filter((reservation) =>
      reservation.date.includes(value.toISOString())
    );
    setReservations(newReservations);
  };

  const handleReservationClick = (index) => {
    const updatedVisibleReservations = [...visibleReservations];
    updatedVisibleReservations[index] = !updatedVisibleReservations[index];
    setVisibleReservations(updatedVisibleReservations);
  };

  return (
    <div className="home-body">
      <Navbar />
      <div className="calendar-body">
        <Calendar onClickDay={handleDayClick} />
      </div>
      <div className="reservation-header">
        <h1 className="reservation-title">Reservas</h1>
        <Button
          label="Nova reserva"
          className="new-reservation-btn"
          onClick={() => setVisibleNewReservation(true)}
        />
        <Dialog
          header="Nova Reserva"
          visible={visibleNewReservation}
          style={{ width: "30rem" }}
          onHide={() => setVisibleNewReservation(false)}
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
        {!reservations.length ? (
          <p className="empty-list-text">
            Não há reservas para este dia.
            <br />
            Experimente fazer a sua!
          </p>
        ) : (
          ""
        )}

        {reservations.map((reservation, index) => (
          <>
            <div
              key={index}
              className="reservation-item"
              onClick={() => handleReservationClick(index)}
            >
              <div className="item-text">
                <h2 className="item-title">{reservation.title}</h2>
                <p className="item-subtitle">{reservation.description}</p>
              </div>
              <h3 className="item-time">{reservation.begin} - {reservation.end}</h3>
            </div>
            <Dialog
              header={reservation.room}
              visible={visibleReservations[index]}
              style={{ width: "30rem" }}
              onHide={() => handleReservationClick(index)}
              className="modal-dialog"
            >
              <div className="modal-content">
                <div className="false-input-text">
                  <p className="title">Quem Reservou</p>
                  <p className="false-input">{reservation.owner}</p>
                </div>
                <div className="false-input-text">
                  <p className="title">Título</p>
                  <p className="false-input">{reservation.title}</p>
                </div>
                <div className="false-input-time-box">
                  <div className="false-input-time">
                    <p className="title">Início</p>
                    <p className="false-input">{reservation.begin}</p>
                  </div>
                  <div className="false-input-time">
                    <p className="title">Término</p>
                    <p className="false-input">{reservation.end}</p>
                  </div>
                </div>
                <div className="false-input-text">
                  <p className="title">Descrição</p>
                  <p className="false-input-desc">{reservation.description}</p>
                </div>
              </div>
            </Dialog>
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
