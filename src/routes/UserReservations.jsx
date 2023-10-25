import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./stylesheets/UserReservations.css";
import { Dialog } from "primereact/dialog";
import axios, {
  getReservationsByUserId,
  updateReservation,
} from "../servers/Api";

const UserReservations = () => {
  const [userReservations, setUserReservations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setUserReservations(
        await getReservationsByUserId(localStorage.getItem("userId"))
      );
    };
    fetchData().catch(console.error);
  }, []);

  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("/room")
      .then((response) => {
        setRooms(response.data);
      })
      .catch(() => {
        console.log("Algo deu errado no GET de salas!");
      });
  }, []);

  const [visibleReservations, setVisibleReservations] = useState(
    Array(userReservations.length).fill(false)
  );

  function formatDate(inputDate) {
    const months = [
      "Jan.",
      "Fev.",
      "Mar.",
      "Abr.",
      "Mai.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ];

    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = parseInt(dateParts[2]);

    return `${day} de ${month} de ${year}`;
  }
  const [reservationToUpdate, setReservationToUpdate] = useState();

  const handleReservationClick = (index) => {
    const updatedVisibleReservations = [...visibleReservations];
    updatedVisibleReservations[index] = !updatedVisibleReservations[index];
    setVisibleReservations(updatedVisibleReservations);
    setReservationToUpdate(userReservations[index]);
    console.log(reservationToUpdate);
  };

  const handleReservationSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await updateReservation(index + 1, reservationToUpdate, config);
      setVisibleReservations(([index] = false));

      const updatedReservations = await getReservationsByUserId(
        localStorage.getItem("userId")
      );
      setUserReservations(updatedReservations);
    } catch (error) {
      console.error("Erro ao atualizar a reserva:", error);
    }
  };
  return (
    <div className="user-reservations-body">
      <Navbar />
      <div className="filter-box"></div>
      <div className="user-reservations-list">
        {userReservations.map((reservation, index) => (
          <>
            <div
              key={index}
              className="user-reservation-item"
              onClick={() => handleReservationClick(index)}
            >
              <div className="reservation-info">
                <h2 className="title">{reservation.room.title}</h2>
                <p className="desc">{reservation.description}</p>
              </div>
              <div className="reservation-datetime">
                <h3 className="begin-end">
                  {reservation.begin} - {reservation.end}
                </h3>
                <p className="date">{formatDate(reservation.date)}</p>
              </div>
            </div>
            <Dialog
              key={`dialog-${index}`}
              header="Editar reserva"
              visible={visibleReservations[index]}
              style={{ width: "30rem" }}
              onHide={() => handleReservationClick(index)}
              className="modal-dialog"
            >
              <div className="modal-content">
                <form onSubmit={handleReservationSubmit} className="form-panel">
                  <label htmlFor="reservation-room">Sala</label>
                  <select
                    name="room"
                    id="reservation-room"
                    value="teste"
                    onChange={(e) =>
                      setReservationToUpdate({
                        ...reservationToUpdate,
                        room: { id: e.target.value },
                      })
                    }
                    required
                  >
                    {rooms.map((room, index) =>
                      room.id !== reservation.room.id ? (
                        <option value={room.id} key={index} selected="false">
                          {room.title}
                        </option>
                      ) : (
                        <option value={room.id} key={index} selected>
                          {room.title}
                        </option>
                      )
                    )}
                  </select>
                  <label htmlFor="reservation-title">Título</label>
                  <input
                    type="text"
                    name="title"
                    id="reservation-title"
                    value={reservation.title}
                    onChange={(e) =>
                      setReservationToUpdate({
                        ...reservationToUpdate,
                        title: e.target.value,
                      })
                    }
                  />
                  <div className="reservation-time-box">
                    <div className="time-input">
                      <label htmlFor="reservation-start-time">Início</label>
                      <input
                        type="time"
                        name="begin"
                        id="reservation-start-time"
                        value={reservation.begin}
                        onChange={(e) =>
                          setReservationToUpdate({
                            ...newResreservationToUpdateervation,
                            begin: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="time-input">
                      <label htmlFor="reservation-end-time">Término</label>
                      <input
                        type="time"
                        name="end"
                        id="reservation-end-time"
                        value={reservation.end}
                        onChange={(e) =>
                          setReservationToUpdate({
                            ...reservationToUpdate,
                            end: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <label htmlFor="reservation-desc">Descrição</label>
                  <textarea
                    type="text"
                    name="description"
                    id="reservation-desc"
                    className="reservation-desc"
                    value={reservation.description}
                    onChange={(e) =>
                      setReservationToUpdate({
                        ...reservationToUpdate,
                        description: e.target.value,
                      })
                    }
                  />
                  <button type="submit" className="submit-reservation-btn">
                    Reservar
                  </button>
                </form>
              </div>
            </Dialog>
          </>
        ))}
      </div>
    </div>
  );
};

export default UserReservations;
