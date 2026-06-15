import axios from "axios";
import { store } from "./store";
import { logout } from "./authSlice";

export const tokenExpirado = (token) => {
  try {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const api = axios.create();

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  if (token) {
    if (tokenExpirado(token)) {
      store.dispatch(logout());
      return Promise.reject(new Error("Sesión expirada"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    const msg =
      error.response?.data?.error ||
      error.response?.data?.message ||
      `Error ${error.response?.status ?? "de red"}`;
    return Promise.reject(new Error(msg));
  }
);

export default api;
