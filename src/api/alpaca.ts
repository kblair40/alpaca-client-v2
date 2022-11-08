import axios from "axios";

let token = window.localStorage.getItem("alpaca-token");
console.log("\nTOKEN BEFORE:", token);

if (token) {
  // token = `Bearer ${token.slice(1, -1)}`;
  token = `Bearer ${token}`;
}

console.log("\nTOKEN AFTER:", token);

const api = axios.create({
  baseURL: "https://api.alpaca.markets/v2",
  headers: {
    Authorization: token,
  },
});

export default api;
