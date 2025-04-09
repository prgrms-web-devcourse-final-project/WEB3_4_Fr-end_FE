// lib/axios.ts
import axios from 'axios';

export const API_URL = 'http://api.sete.kr:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
