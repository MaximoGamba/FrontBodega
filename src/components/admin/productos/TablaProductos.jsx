import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import BotonToggle from "./BotonToggle";

const ITEMS_POR_PAGINA = 10;

const TablaProductos = ({ onEditar }) => {
  const { itemsAdmin, loading: cargando } = useSelector((state) => state.vinos);
  const [pagina, setPagina] = useState(1);

  const productos = useMemo(
    () => [...itemsAdmin].sort((a, b) => {
      if (a.active === b.active) return b.id - a.id;
      return a.active === false ? 1 : -1;
    }),
    [itemsAdmin]
  );

  if (cargando) {
    return <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px" }}>Cargando...</p>;
  }

  if (productos.length === 0) {
    return <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px", fontSize: "14px" }}>No hay productos cargados.</p>;
  }

  const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const productosPagina = productos.slice((pagina - 1) * ITEMS_POR_PAGINA, pagina * ITEMS_POR_PAGINA);

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
            {["Nombre", "Bodega", "Precio", "Stock", "Descuento", "Estado", ""].map((h) => (
              <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productosPagina.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "12px" }}>{p.name}</td>
              <td style={{ padding: "12px", color: "var(--gray)" }}>{p.winery}</td>
              <td style={{ padding: "12px" }}>${Number(p.price).toLocaleString()}</td>
              <td style={{ padding: "12px" }}>
                {p.stock <= 5 ? <span className="stock-bajo">{p.stock}</span> : p.stock}
              </td>
              <td style={{ padding: "12px" }}>{p.discountPercent > 0 ? `${p.discountPercent}%` : "—"}</td>
              <td style={{ padding: "12px" }}>
                <span style={{ fontSize: "11px", padding: "3px 10px", background: p.active !== false ? "#e6f4ea" : "#fce8e8", color: p.active !== false ? "#2d7a2d" : "#c0392b" }}>
                  {p.active !== false ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => onEditar(p)}
                  style={{ background: "none", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Editar
                </button>
                <BotonToggle producto={p} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPaginas > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
          <button
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina === 1}
            style={{ background: "none", border: "1px solid var(--border)", padding: "6px 16px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: pagina === 1 ? "not-allowed" : "pointer", opacity: pagina === 1 ? 0.4 : 1 }}
          >
            Anterior
          </button>
          <span style={{ fontSize: "12px", color: "var(--gray)", letterSpacing: "1px" }}>
            {pagina} / {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina === totalPaginas}
            style={{ background: "none", border: "1px solid var(--border)", padding: "6px 16px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: pagina === totalPaginas ? "not-allowed" : "pointer", opacity: pagina === totalPaginas ? 0.4 : 1 }}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};

export default TablaProductos;
