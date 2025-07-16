import axios from "axios";
// import { useAuthStore } from "../../stores/auth";

export const axiosInstance = axios.create({
  baseURL: ``,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    // const { logout } = useAuthStore();

    if (err.response?.status === 403) {
    //   toast.error('Аккаунт не авторизован!');
    //   logout();
    }

    return Promise.reject(err);
  }
);
