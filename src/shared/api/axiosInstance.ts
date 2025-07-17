import axios from "axios";
import { useAuthStore } from "../../features/auth/store/auth";

export const axiosInstance = axios.create({
    baseURL: `https://${import.meta.env.VITE_API_BASE_URL}.mokky.dev`,
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

axiosInstance.interceptors.response.use(
  (responce) => responce,
  async (error) => {
    if(error.responce?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/auth'
    }
    return Promise.reject(error);
  }
)