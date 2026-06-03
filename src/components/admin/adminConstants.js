export const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "8px 12px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

export const labelStyle = {
  fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block", marginBottom: "4px",
};

export const errorStyle = {
  fontSize: "11px", color: "#c0392b", marginTop: "4px", display: "block",
};

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
