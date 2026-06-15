import api from "@/redux/api";

const BASE = import.meta.env.VITE_PEDIDOS_URL;

export const fetchPedidosAdmin      = ()              => api.get(`${BASE}/pedidos`);
export const actualizarEstadoPedido = (id, status)    => api.put(`${BASE}/pedidos/${id}`, { status });
export const crearPedido            = (items)         => api.post(`${BASE}/pedidos`, { items });
