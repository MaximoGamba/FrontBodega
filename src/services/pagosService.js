import api from "@/redux/api";

const BASE = import.meta.env.VITE_PEDIDOS_URL;

export const crearPago = (pedidoId, amount, method) =>
  api.post(`${BASE}/pedidos/${pedidoId}/pagos`, { amount, method });
