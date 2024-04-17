import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/backend/"
    : "https://judge.propulsion-learn.ch/backend/";

const JudgeAxios = axios.create({
  baseURL: BASE_URL,
});

// Interceptor for installing an authorization token from localStorage
JudgeAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default JudgeAxios;
