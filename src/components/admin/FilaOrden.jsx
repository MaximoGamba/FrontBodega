import { useState } from "react";
import { toast } from "react-toastify";
import { actualizarEstadoPedido } from "../../services/api";
import { inputStyle, labelStyle, ORDEN_ESTADO_LABEL, ORDEN_ESTADO_COLOR } from "./adminConstants";

const FilaOrden = ({ pedido, onEstadoActualizado }) => {
  const [expandida, setExpandida] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(pedido.status);
  const [guardando, setGuardando] = useState(false);

  const estado = pedido.status;
  const colores = ORDEN_ESTADO_COLOR[estado] || { bg: "#f5f5f5", text: "var(--gray)" };
  const fecha = pedido.createdAt
    ? new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  const guardarEstado = async () => {
    if (nuevoEstado === pedido.status) return;
    setGuardando(true);
    try {
      const actualizado = await actualizarEstadoPedido(pedido.id, nuevoEstado);
      onEstadoActualizado(actualizado);
    } catch {
      toast.error("Error al actualizar el estado.");
    } finally {
      setGuardando(false);
    }
  };

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
            {ORDEN_ESTADO_LABEL[estado] || estado}
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

              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Productos</p>
                {pedido.items?.length > 0 ? pedido.items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--neutral)" }}>
                      {item.wine?.name || `Vino #${item.wine?.id}`}
                      <span style={{ color: "var(--gray)", marginLeft: "8px" }}>× {item.quantity}</span>
                    </span>
                    <span style={{ fontWeight: "600" }}>${Number(item.subtotal).toLocaleString()}</span>
                  </div>
                )) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin ítems</p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginTop: "8px" }}>
                  <span>Total</span>
                  <span>${Number(pedido.total).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Envío</p>
                {pedido.shipment ? (
                  <>
                    <p style={{ fontSize: "13px", marginBottom: "8px", lineHeight: "1.5" }}>{pedido.shipment.address}</p>
                    <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
                      Estado:{" "}
                      <strong style={{ color: pedido.shipment.status === "DELIVERED" ? "#2d7a2d" : pedido.shipment.status === "CANCELLED" ? "#c0392b" : "var(--neutral)" }}>
                        {{ PENDING: "Pendiente", SHIPPED: "Enviado", DELIVERED: "Entregado", CANCELLED: "Cancelado" }[pedido.shipment.status] || pedido.shipment.status}
                      </strong>
                    </p>
                    {pedido.shipment.trackingNumber && (
                      <p style={{ fontSize: "12px", color: "var(--gray)" }}>
                        Tracking: <strong>{pedido.shipment.trackingNumber}</strong>
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin dirección de envío</p>
                )}
              </div>

              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Pago</p>
                {pedido.payment ? (
                  <>
                    <p style={{ fontSize: "13px", fontWeight: "600", margin: "0 0 4px" }}>
                      ${Number(pedido.payment.amount).toLocaleString()}
                    </p>
                    {pedido.payment.method && (
                      <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
                        Método: <strong>{{ TARJETA: "Tarjeta", TRANSFERENCIA: "Transferencia" }[pedido.payment.method] || pedido.payment.method}</strong>
                      </p>
                    )}
                    {pedido.payment.createdAt && (
                      <p style={{ fontSize: "12px", color: "var(--gray)" }}>
                        {new Date(pedido.payment.createdAt).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ fontSize: "13px", color: "var(--gray)" }}>Sin pago registrado</p>
                )}
              </div>

              <div>
                <p style={{ ...labelStyle, marginBottom: "12px" }}>Cambiar estado del pedido</p>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  style={{ ...inputStyle, background: "white", marginBottom: "12px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {Object.entries(ORDEN_ESTADO_LABEL).map(([val, lbl]) => (
                    <option key={val} value={val}>{lbl}</option>
                  ))}
                </select>
                <button
                  onClick={(e) => { e.stopPropagation(); guardarEstado(); }}
                  disabled={guardando || nuevoEstado === pedido.status}
                  style={{
                    background: "var(--primary)", color: "white", border: "none",
                    padding: "9px 24px", fontSize: "12px", letterSpacing: "1px",
                    textTransform: "uppercase", cursor: guardando || nuevoEstado === pedido.status ? "not-allowed" : "pointer",
                    opacity: guardando || nuevoEstado === pedido.status ? 0.5 : 1,
                  }}
                >
                  {guardando ? "Guardando..." : "Actualizar"}
                </button>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default FilaOrden;
