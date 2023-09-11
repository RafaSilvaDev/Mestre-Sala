import React, { useState } from "react";

import Navbar from "../components/Navbar";
import "./stylesheets/Rooms.css"

import { Dialog } from "primereact/dialog";
import Data from "../../db/mockdb.json";

const Rooms = () => {
  const [visibleRoom, setVisibleRoom] = useState(false);
  const rooms = Data.room;

  return (
    <div className="rooms-body">
        <Navbar />
      <div className="filter-box"></div>
      <div className="rooms-list">
        {rooms.map((room) => (
          <div className="room-item">
            <div className="room-info">
              <h2 className="title">{room.title}</h2>
              <p className="desc">{room.description}</p>
            </div>
            <div className="room-icon"><i className="pi pi-chevron-right" style={{ fontSize: '1.3rem' }}></i></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
