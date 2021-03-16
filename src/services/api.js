import axios from "axios";

const api = axios.create({
  baseURL: "https://api.lmsalgados.com.br",
});

export default api;
