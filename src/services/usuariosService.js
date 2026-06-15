import api from "@/redux/api";

const BASE = import.meta.env.VITE_USUARIOS_URL;

export const fetchUsuario        = (userId)        => api.get(`${BASE}/usuarios/${userId}`);
export const actualizarUsuario   = (userId, datos) => api.put(`${BASE}/usuarios/${userId}`, datos);
export const fetchPedidosUsuario = (userId)        => api.get(`${BASE}/usuarios/${userId}/pedidos`);
