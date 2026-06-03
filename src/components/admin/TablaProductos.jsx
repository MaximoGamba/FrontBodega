const TablaProductos = ({ productos, cargando, onEditar, onToggle }) => {
  if (cargando) {
    return <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px" }}>Cargando...</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
          {["Nombre", "Bodega", "Precio", "Stock", "Descuento", "Estado", ""].map((h) => (
            <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
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
                onClick={() => onToggle(p)}
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
  );
};

export default TablaProductos;
