import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { putEstadoPedido } from "@/redux/pedidosSlice";
import { inputStyle, labelStyle } from "../../../styles/adminStyles";
import { ORDEN_ESTADO_LABEL } from "../../../utils/pedidoUtils";
import Boton from "../../shared/Boton";

const CambiarEstado = ({ pedidoId, estadoActual, onEstadoActualizado }) => {
  const dispatch = useDispatch();
  const [guardando, setGuardando] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(estadoActual);

  const guardarEstado = async () => {
    if (nuevoEstado === estadoActual) return;
    setGuardando(true);
    const result = await dispatch(putEstadoPedido({ id: pedidoId, status: nuevoEstado }));
    setGuardando(false);
    if (putEstadoPedido.fulfilled.match(result)) {
      onEstadoActualizado(result.payload);
    } else {
      toast.error("Error al actualizar el estado.");
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
      <Boton
        variante="primario"
        tamaño="sm"
        disabled={guardando || nuevoEstado === estadoActual}
        onClick={(e) => { e.stopPropagation(); guardarEstado(); }}
      >
        {guardando ? "Guardando..." : "Actualizar"}
      </Boton>
    </div>
  );
};

export default CambiarEstado;
