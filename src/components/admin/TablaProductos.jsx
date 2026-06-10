import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchVinosAdmin, desactivarVinoAPI, reactivarVinoAPI } from "../../services/api";

const ITEMS_POR_PAGINA = 10;

const TablaProductos = ({ version, onEditar }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setCargando(true);
    setPagina(1);
    fetchVinosAdmin()
      .then((vinos) => {
        setProductos([...vinos].sort((a, b) => {
          if (a.active === b.active) return b.id - a.id;
          return a.active === false ? 1 : -1;
        }));
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [version]);

  const toggleActivo = (producto) => {
    const accion = producto.active !== false ? "desactivar" : "reactivar";
    const toastId = `toggle-${producto.id}`;
    if (toast.isActive(toastId)) return;
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Desea {accion} este producto?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={async () => {
                closeToast();
                try {
                  if (producto.active !== false) await desactivarVinoAPI(producto.id);
                  else await reactivarVinoAPI(producto.id);
                  setProductos((prev) => {
                    const updated = prev.map((p) =>
                      p.id === producto.id ? { ...p, active: producto.active === false } : p
                    );
                    return updated.sort((a, b) => {
                      if (a.active === b.active) return b.id - a.id;
                      return a.active === false ? 1 : -1;
                    });
                  });
                } catch {
                  toast.error(`Error al ${accion} el producto.`);
                }
              }}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Confirmar
            </button>
            <button
              onClick={closeToast}
              style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { toastId, autoClose: false, closeButton: false }
    );
  };

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
                <button
                  onClick={() => toggleActivo(p)}
                  style={{
                    background: "none",
                    border: p.active !== false ? "1px solid #e0b0b0" : "1px solid #b0c8b0",
                    color: p.active !== false ? "#c0392b" : "#2d7a2d",
                    padding: "6px 14px", fontSize: "11px", letterSpacing: "1px",
                    textTransform: "uppercase", cursor: "pointer",
                  }}
                >
                  {p.active !== false ? "Desactivar" : "Reactivar"}
                </button>
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
