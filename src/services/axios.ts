import axios from "axios";
import { API_BASE_URL } from "@/env";

const getToken = () => {
  return localStorage.getItem("token") || "";
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default instance;
