import React, {useState} from "react";
import "../routes/stylesheets/NewReservationModal.css";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';  

const NewReservationModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="modal-body">
      <Button
        label="Nova reserva"
        className="new-reservation-btn"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Nova Reserva"
        visible={visible}
        style={{ width: "30rem" }}
        onHide={() => setVisible(false)}
      >
        <div className="modal-content"></div>
      </Dialog>
    </div>
  );
};

export default NewReservationModal;
