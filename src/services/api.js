import axios from "axios";

const api = axios.create({
  baseURL: "192.168.0.200/lmsalgados.com.br/webservices",
});

export default api;
