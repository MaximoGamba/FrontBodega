const OrdenadorProductos = ({ cantidad, busqueda, orden, onOrden }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>
      {busqueda ? `Buscando resultados para: "${busqueda}"` : "Catálogo de Vinos"}
    </h1>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontSize: "13px", color: "var(--gray)" }}>{cantidad} resultados</span>
      <select
        value={orden}
        onChange={(e) => onOrden(e.target.value)}
        style={{ border: "1px solid var(--border)", padding: "6px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", background: "white", cursor: "pointer" }}
      >
        <option value="">Ordenar por</option>
        <option value="precio-asc">Menor precio</option>
        <option value="precio-desc">Mayor precio</option>
        <option value="nuevo">Más reciente</option>
        <option value="antiguo">Más antiguo</option>
      </select>
    </div>
  </div>
);

export default OrdenadorProductos;
