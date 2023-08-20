import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL!}api`,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
