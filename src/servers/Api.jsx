import axios from "axios"

const Api = axios.create({
    baseURL: "127.0.0.1:8080",
  });
  
  export default Api;