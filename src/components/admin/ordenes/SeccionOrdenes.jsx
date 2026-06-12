import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosAdmin } from "../../../redux/slices/pedidosSlice";
import { ORDEN_ESTADO_LABEL } from "../adminConstants";
import FilaOrden from "./FilaOrden";

const SeccionOrdenes = () => {
  const dispatch = useDispatch();
  const { pedidosAdmin: pedidos, loading: cargando } = useSelector((state) => state.pedidos);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  useEffect(() => {
    if (pedidos.length === 0) dispatch(fetchPedidosAdmin());
  }, [dispatch]);

  const pedidosFiltrados = filtroEstado === "TODOS"
    ? pedidos
    : pedidos.filter((p) => p.status === filtroEstado);

  return (
    <>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {["TODOS", ...Object.keys(ORDEN_ESTADO_LABEL)].map((est) => (
          <button
            key={est}
            onClick={() => setFiltroEstado(est)}
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
                ({pedidos.filter((p) => p.status === est).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {cargando ? (
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px" }}>Cargando pedidos...</p>
      ) : pedidosFiltrados.length === 0 ? (
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
    </>
  );
};

export default SeccionOrdenes;
