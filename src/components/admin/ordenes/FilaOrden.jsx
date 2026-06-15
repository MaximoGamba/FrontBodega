import { useState } from "react";
import { ORDEN_ESTADO_LABEL, ORDEN_ESTADO_COLOR } from "../../../utils/pedidoUtils";
import DetalleProductos from "./DetalleProductos";
import DetalleEnvio from "./DetalleEnvio";
import DetallePago from "./DetallePago";
import CambiarEstado from "./CambiarEstado";

const FilaOrden = ({ pedido, onEstadoActualizado }) => {
  const [expandida, setExpandida] = useState(false);

  const colores = ORDEN_ESTADO_COLOR[pedido.status] || { bg: "#f5f5f5", text: "var(--gray)" };
  const fecha = pedido.createdAt
    ? new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <>
      <tr
        style={{ borderBottom: expandida ? "none" : "1px solid var(--border)", cursor: "pointer" }}
        onClick={() => setExpandida((v) => !v)}
      >
        <td style={{ padding: "14px 12px", fontSize: "13px", fontWeight: "600" }}>#{pedido.id}</td>
        <td style={{ padding: "14px 12px", fontSize: "13px" }}>
          {pedido.user?.username || "—"}
          {pedido.user?.email && <div style={{ fontSize: "11px", color: "var(--gray)" }}>{pedido.user.email}</div>}
        </td>
        <td style={{ padding: "14px 12px", fontSize: "13px", color: "var(--gray)" }}>{fecha}</td>
        <td style={{ padding: "14px 12px" }}>
          <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600", background: colores.bg, color: colores.text, padding: "4px 12px", border: `1px solid ${colores.text}` }}>
            {ORDEN_ESTADO_LABEL[pedido.status] || pedido.status}
          </span>
        </td>
        <td style={{ padding: "14px 12px", fontSize: "13px", fontWeight: "600" }}>
          ${Number(pedido.total).toLocaleString()}
        </td>
        <td style={{ padding: "14px 12px", textAlign: "right", fontSize: "18px", color: "var(--gray)", userSelect: "none" }}>
          {expandida ? "▲" : "▼"}
        </td>
      </tr>

      {expandida && (
        <tr style={{ borderBottom: "1px solid var(--border)" }}>
          <td colSpan={6} style={{ padding: "0 12px 20px 12px", background: "#fafafa" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "24px", paddingTop: "20px" }}>
              <DetalleProductos items={pedido.items} total={pedido.total} />
              <DetalleEnvio shipment={pedido.shipment} />
              <DetallePago payment={pedido.payment} />
              <CambiarEstado
                pedidoId={pedido.id}
                estadoActual={pedido.status}
                onEstadoActualizado={onEstadoActualizado}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default FilaOrden;
