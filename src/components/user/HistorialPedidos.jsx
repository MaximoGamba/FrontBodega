import { ORDEN_ESTADO_LABEL, ORDEN_ESTADO_COLOR } from "../admin/adminConstants";

const HistorialPedidos = ({ pedidos, cargando }) => {
  if (cargando) {
    return <p style={{ color: "var(--gray)", fontSize: "14px" }}>Cargando pedidos...</p>;
  }

  if (pedidos.length === 0) {
    return <p style={{ color: "var(--gray)", fontSize: "14px" }}>Todavía no realizaste ningún pedido.</p>;
  }

  return (
    <>
      {pedidos.map((pedido) => {
        const color = ORDEN_ESTADO_COLOR[pedido.status]?.text || "var(--gray)";
        const label = ORDEN_ESTADO_LABEL[pedido.status] || pedido.status;
        const fecha = pedido.createdAt
          ? new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
          : "—";

        return (
          <div key={pedido.id} style={{ border: "1px solid var(--border)", padding: "24px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "2px" }}>Pedido #{pedido.id}</p>
                <p style={{ fontSize: "12px", color: "var(--gray)" }}>{fecha}</p>
              </div>
              <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color, fontWeight: "600", border: `1px solid ${color}`, padding: "4px 12px" }}>
                {label}
              </span>
            </div>

            {pedido.items?.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray)", marginBottom: "6px" }}>
                <span>{item.wine?.name} × {item.quantity}</span>
                <span>${Number(item.subtotal).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}>
              <span>Total</span>
              <span>${Number(pedido.total).toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HistorialPedidos;
