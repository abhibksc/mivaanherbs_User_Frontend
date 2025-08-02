// utils/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
  }
});

export default api;
