import api from "@/redux/api";

const BASE = import.meta.env.VITE_PEDIDOS_URL;

export const crearEnvio = (pedidoId, address) =>
  api.post(`${BASE}/pedidos/${pedidoId}/envios`, { address });
