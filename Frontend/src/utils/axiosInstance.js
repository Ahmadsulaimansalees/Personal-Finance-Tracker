import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptors

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response Interceptors

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // handle common error globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to Login Page
        window.location.href == "/login";
      } else if (error.response.status === 500) {
        console.error("server error, please try again");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Reauest timeout please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
