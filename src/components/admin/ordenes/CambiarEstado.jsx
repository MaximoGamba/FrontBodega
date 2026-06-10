import { useState } from "react";
import { toast } from "react-toastify";
import { actualizarEstadoPedido } from "../../../services/api";
import { inputStyle, labelStyle, ORDEN_ESTADO_LABEL } from "../adminConstants";

const CambiarEstado = ({ pedidoId, estadoActual, onEstadoActualizado }) => {
  const [nuevoEstado, setNuevoEstado] = useState(estadoActual);
  const [guardando, setGuardando] = useState(false);

  const guardarEstado = async () => {
    if (nuevoEstado === estadoActual) return;
    setGuardando(true);
    try {
      const actualizado = await actualizarEstadoPedido(pedidoId, nuevoEstado);
      onEstadoActualizado(actualizado);
    } catch {
      toast.error("Error al actualizar el estado.");
    } finally {
      setGuardando(false);
    }
  };

  return (
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
        disabled={guardando || nuevoEstado === estadoActual}
        style={{
          background: "var(--primary)", color: "white", border: "none",
          padding: "9px 24px", fontSize: "12px", letterSpacing: "1px",
          textTransform: "uppercase",
          cursor: guardando || nuevoEstado === estadoActual ? "not-allowed" : "pointer",
          opacity: guardando || nuevoEstado === estadoActual ? 0.5 : 1,
        }}
      >
        {guardando ? "Guardando..." : "Actualizar"}
      </button>
    </div>
  );
};

export default CambiarEstado;
