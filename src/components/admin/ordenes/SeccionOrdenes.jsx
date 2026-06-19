import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiltroOrdenesAdmin } from "@/redux/adminUISlice";
import usePedidosAdmin from "../../../hooks/usePedidosAdmin";
import { ORDEN_ESTADO_LABEL } from "../../../utils/pedidoUtils";
import FilaOrden from "./FilaOrden";
import EstadoCarga from "../../shared/EstadoCarga";

const SeccionOrdenes = () => {
  const dispatch = useDispatch();
  const { pedidos, cargando, error } = usePedidosAdmin();
  const filtroEstado = useSelector((state) => state.adminUI.filtroOrdenesAdmin);

  const pedidosFiltrados = filtroEstado === "TODOS"
    ? pedidos
    : pedidos.filter((p) => p.status === filtroEstado);

  const conteosPorEstado = useMemo(
    () => Object.keys(ORDEN_ESTADO_LABEL).reduce((acc, est) => {
      acc[est] = pedidos.filter((p) => p.status === est).length;
      return acc;
    }, {}),
    [pedidos]
  );

  return (
    <>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["TODOS", ...Object.keys(ORDEN_ESTADO_LABEL)].map((est) => (
          <button
            key={est}
            onClick={() => dispatch(setFiltroOrdenesAdmin(est))}
            style={{
              background: filtroEstado === est ? "var(--primary)" : "white",
              color: filtroEstado === est ? "white" : "var(--neutral)",
              border: "1px solid var(--border)",
              padding: "6px 16px", fontSize: "11px", letterSpacing: "1px",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {est === "TODOS" ? "Todos" : ORDEN_ESTADO_LABEL[est]}
            {est !== "TODOS" && (
              <span style={{ marginLeft: "6px", opacity: 0.7 }}>
                ({conteosPorEstado[est] ?? 0})
              </span>
            )}
          </button>
        ))}
      </div>

      <EstadoCarga cargando={cargando} error={error}>
        {pedidosFiltrados.length === 0 ? (
          <p style={{ color: "var(--gray)", fontSize: "14px" }}>No hay pedidos en este estado.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                {["#", "Usuario", "Fecha", "Estado", "Total", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <FilaOrden key={pedido.id} pedido={pedido} />
              ))}
            </tbody>
          </table>
        )}
      </EstadoCarga>
    </>
  );
};

export default SeccionOrdenes;
