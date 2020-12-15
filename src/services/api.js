import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/lmsalgados.com.br/_sistema/webservices",
});

export default api;
