import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./stylesheets/Rooms.css";
import { Dialog } from "primereact/dialog";
import axios from "../servers/Api";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("/room")
      .then((response) => {
        setRooms(response.data);
      })
      .catch(() => {
        console.log("Algo deu errado na requisição ao server!");
      });
  }, []);

  const [visibleRooms, setVisibleRooms] = useState(
    Array(rooms.length).fill(false)
  );

  const handleRoomClick = (index) => {
    const updatedVisibleRooms = [...visibleRooms];
    updatedVisibleRooms[index] = !updatedVisibleRooms[index];
    setVisibleRooms(updatedVisibleRooms);
  };

  return (
    <div className="rooms-body">
      <Navbar />
      <div className="filter-box"></div>
      <div className="rooms-list">
        {rooms.map((room, index) => (
          <>
            <div
              key={index}
              className="room-item"
              onClick={() => handleRoomClick(index)}
            >
              <div className="room-info">
                <h2 className="title">{room.title}</h2>
                <p className="desc">{room.description}</p>
              </div>
              <div className="room-icon">
                <i
                  className="pi pi-chevron-right"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              </div>
            </div>
            <Dialog
              key={`dialog-${index}`}
              header={room.title}
              visible={visibleRooms[index]}
              style={{ width: "30rem" }}
              onHide={() => handleRoomClick(index)}
              className="modal-dialog"
            >
              <div className="modal-content">
                <div className="false-input-text">
                  <p className="title">Localização</p>
                  <p className="false-input">{room.location}</p>
                </div>
                <div className="false-input-text">
                  <p className="title">Descrição</p>
                  <p className="false-input-desc">{room.description}</p>
                </div>
              </div>
            </Dialog>
          </>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
