export const ORDEN_ESTADO_LABEL = {
  CREATED: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "En camino",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export const ORDEN_ESTADO_COLOR = {
  CREATED: { bg: "#f5f5f5", text: "var(--gray)" },
  PAID: { bg: "#e6f4ea", text: "#2d7a2d" },
  SHIPPED: { bg: "#fff8e1", text: "#b07d00" },
  DELIVERED: { bg: "#e8f0fe", text: "#1a56db" },
  CANCELLED: { bg: "#fce8e8", text: "#c0392b" },
};

export const ENVIO_ESTADO_LABEL = {
  PENDING: "Pendiente",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export const PAGO_METODO_LABEL = {
  TARJETA: "Tarjeta",
  TRANSFERENCIA: "Transferencia",
};
