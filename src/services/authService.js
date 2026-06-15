import api from "@/redux/api";

const BASE = import.meta.env.VITE_AUTH_URL;

export const loginAPI     = (datos) => api.post(`${BASE}/auth/login`, datos);
export const registrarAPI = (datos) => api.post(`${BASE}/api/v1/auth/register`, datos);
