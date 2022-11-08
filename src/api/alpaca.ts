import axios from "axios";

const token = window.localStorage.getItem("alpaca-token");

export const api = axios.create({
  baseURL: "https://api.alpaca.markets/v2",
  headers: {
    Authorization: token,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // mode: "cors",
});

export default api;
