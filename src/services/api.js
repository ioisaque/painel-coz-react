import axios from "axios";

const api = axios.create({
  // baseURL: "https://beta.lmsalgados.com.br/webservices",
  baseURL: "https://localhost/lmsalgados.com.br/webservices",
});

export default api;
