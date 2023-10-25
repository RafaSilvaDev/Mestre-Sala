import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090",
  headers: { "Content-Type": "application/json" }
});

export default api;

export const getReservationsByDate = async (date) => {
  try {
    const response = await api.get(`/reservation/${date}`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação GET de reservas: ", error);
    throw error; 
  }
};

export const getReservationsByUserId = async (userId) => {
  try {
    const response = await api.get(`/reservation/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação GET de reservas: ", error);
    throw error; 
  }
};

export const createReservation = async (reservation, config) => {
  try {
    await api.post("/reservation", reservation, config);
  } catch (error) {
    console.error("Erro na solicitação POST de reservas: ", error);
    throw error; 
  }
};

export const updateReservation = async (id, reservation, config) => {
  try {
    await api.put("/reservation/" + id, reservation, config)
    await api.put("/reservation/" + id, reservation, config)
  } catch (error) {
    console.error("Erro na solicitação PUT de reservas: ", error);
    throw error;
  }
}

export const deleteReservation = async (id, config) => {
  try {
    await api.delete("/reservation/" + id, config)
  } catch (error) {
    console.error("Erro na solicitação DELETE de reserva: ", error);
  }
}

export const getAllRooms = async () => {
  try {
    const response = await api.get("/room");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação GET de salas: ", error);
    throw error; 
  }
};
