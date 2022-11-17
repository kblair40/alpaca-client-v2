import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

api.interceptors.request.use(
  // called everytime we make a request
  async (config) => {
    const token = await window.localStorage.getItem("auth-token");

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // called only when there is an error in the request
  (err) => {
    console.log("ERROR IN AXIOS INSTANCE");
    return Promise.reject(err);
  }
);

export default api;

export const alpaca = axios.create({
  baseURL: "http://localhost:3001/alpaca/",
});

alpaca.interceptors.request.use(
  // called everytime we make a request
  async (config) => {
    const token = await window.localStorage.getItem("auth-token");
    const alpacaToken = await window.localStorage.getItem("alpaca-token");

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
      config.headers!["Alpaca-Authorization"] = `Bearer ${alpacaToken}`;
    }

    // TESTING
    // console.log("\n\nCONFIG:", config, "\n\n");

    return config;
  },
  // called only when there is an error in the request
  (err) => {
    console.log("ERROR IN AXIOS INSTANCE");
    return Promise.reject(err);
  }
);
