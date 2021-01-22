import axios from "axios";

const api = axios.create({
  // baseURL: "https://beta.lmsalgados.com.br/webservices",
  baseURL: "http://localhost/lmsalgados.com.br/webservices",
});

export default api;
