import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./stylesheets/UserReservations.css";
import { Dialog } from "primereact/dialog";
import axios, {
  getReservationsByUserId,
  updateReservation,
  deleteReservation,
} from "../servers/Api";
import { Link } from "react-router-dom";

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

  const [visibleReservationsOnDelete, setVisibleReservationsOnDelete] =
    useState(Array(userReservations.length).fill(false));

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
  const [reservationToManipulate, setReservationToManipulate] = useState({
    date: "",
    title: "",
    begin: "",
    end: "",
    description: "",
    user: {
      id: "",
    },
    room: {
      id: "",
    },
  });

  function closeFormDialog(index) {
    const updatedVisibleReservations = [...visibleReservations];
    updatedVisibleReservations[index] = false;
    setVisibleReservations(updatedVisibleReservations);
  }

  function closeDeleteDialog(index) {
    const updatedVisibleDeleteReservations = [...visibleReservationsOnDelete];
    updatedVisibleDeleteReservations[index] = false;
    setVisibleReservationsOnDelete(updatedVisibleDeleteReservations);
  }

  const handleReservationClick = (index) => {
    const updatedVisibleReservations = [...visibleReservations];
    updatedVisibleReservations[index] = !updatedVisibleReservations[index];
    setVisibleReservations(updatedVisibleReservations);
    setReservationToManipulate(userReservations[index]);
  };

  const handleDeleteReservationClick = (index) => {
    const updatedVisibleDeleteReservations = [...visibleReservationsOnDelete];
    updatedVisibleDeleteReservations[index] =
      !updatedVisibleDeleteReservations[index];
    setVisibleReservationsOnDelete(updatedVisibleDeleteReservations);
    setReservationToManipulate(userReservations[index]);
  };

  const handleReservationSubmit = async (e, index) => {
    e.preventDefault();
    setReservationToManipulate(userReservations[index]);
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await updateReservation(
        reservationToManipulate.id,
        reservationToManipulate,
        config
      );

      // Fechar o Dialog após o envio do formulário
      closeFormDialog(index);

      setReservationToManipulate(null);

      const updatedReservations = await getReservationsByUserId(
        localStorage.getItem("userId")
      );
      setUserReservations(updatedReservations);
    } catch (error) {
      console.error("Erro ao atualizar a reserva: ", error);
    }
  };

  const handleConfirmDeleteReservation = async (index) => {
    setReservationToManipulate(userReservations[index]);
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await deleteReservation(reservationToManipulate.id, config);

      // Fechar o Dialog após o envio do formulário
      closeDeleteDialog(index);

      setReservationToManipulate(null);

      const updatedReservations = await getReservationsByUserId(
        localStorage.getItem("userId")
      );
      setUserReservations(updatedReservations);
    } catch (error) {
      console.error("Erro ao apagar a reserva: ", error);
    }
  };

  return (
    <div className="user-reservations-body">
      <Navbar />
      <div className="filter-box"></div>
      <div className="user-reservations-list">
        {userReservations.length ? (
          userReservations.map((reservation, index) => (
            <>
              <div
                key={index}
                className="user-reservation-item"
                onClick={() => handleReservationClick(index)}
              >
                <div className="reservation-info">
                  <h2 className="title">{reservation.room.title}</h2>
                  <p className="desc">{reservation.title}</p>
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
                  <form
                    onSubmit={(e) => handleReservationSubmit(e, index)}
                    className="form-panel"
                  >
                    <label htmlFor="reservation-room">Sala</label>
                    <select
                      name="room"
                      id="reservation-room"
                      value={
                        reservationToManipulate && reservationToManipulate.room
                          ? reservationToManipulate.room.id
                          : ""
                      }
                      onChange={(e) =>
                        setReservationToManipulate({
                          ...reservationToManipulate,
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
                      value={
                        reservationToManipulate
                          ? reservationToManipulate.title
                          : ""
                      }
                      onChange={(e) =>
                        setReservationToManipulate({
                          ...reservationToManipulate,
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
                          value={
                            reservationToManipulate
                              ? reservationToManipulate.begin
                              : ""
                          }
                          onChange={(e) =>
                            setReservationToManipulate({
                              ...reservationToManipulate,
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
                          value={
                            reservationToManipulate
                              ? reservationToManipulate.end
                              : ""
                          }
                          onChange={(e) =>
                            setReservationToManipulate({
                              ...reservationToManipulate,
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
                      value={
                        reservationToManipulate
                          ? reservationToManipulate.description
                          : ""
                      }
                      onChange={(e) =>
                        setReservationToManipulate({
                          ...reservationToManipulate,
                          description: e.target.value,
                        })
                      }
                    />
                    <button type="submit" className="primary-dialog-btn">
                      Reservar
                    </button>
                    <button
                      className="secondary-dialog-btn"
                      onClick={() => handleDeleteReservationClick(index)}
                    >
                      Excluir reserva
                    </button>
                  </form>
                </div>
              </Dialog>
              <Dialog
                key={`delete-dialog-${index}`}
                header="Apagar reserva"
                visible={visibleReservationsOnDelete[index]}
                style={{ width: "20rem" }}
                onHide={() => handleDeleteReservationClick(index)}
                className="modal-dialog"
              >
                <h3 className="text">
                  Tem certeza que deseja excluir esta reserva?
                </h3>
                <p className="reservation-to-delete">{reservation.title}</p>
                <button
                  className="primary-dialog-btn"
                  onClick={() => handleConfirmDeleteReservation(index)}
                >
                  Apagar
                </button>
                <button
                  className="secondary-dialog-btn"
                  onClick={() => handleDeleteReservationClick(index)}
                >
                  Cancelar
                </button>
              </Dialog>
            </>
          ))
        ) : (
          <p className="empty-list-text-center">
            Você ainda não realizou nenhuma reserva.
            <br />
            <Link className="link-style" to="/home">Experimente fazer a sua!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default UserReservations;
