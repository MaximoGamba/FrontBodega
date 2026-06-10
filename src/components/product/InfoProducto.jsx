const InfoProducto = ({ producto, precioFinal }) => (
  <div>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "8px" }}>
      {producto.colorNombre} · {producto.cepaNombre}
    </p>
    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "4px" }}>
      {producto.name}
    </h1>
    <p style={{ fontSize: "14px", color: "var(--gray)", marginBottom: "24px" }}>
      {producto.winery} · {producto.year}
    </p>

    <div style={{ marginBottom: "28px" }}>
      {producto.discountPercent > 0 && (
        <p style={{ fontSize: "14px", color: "var(--gray)", textDecoration: "line-through", marginBottom: "4px" }}>
          ${producto.price.toLocaleString()}
        </p>
      )}
      <p style={{ fontSize: "28px", fontWeight: "600", color: "var(--neutral)" }}>
        ${precioFinal.toLocaleString()}
      </p>
    </div>

    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", marginBottom: "28px" }}>
      {[
        { label: "Azúcar",      valor: producto.azucarNombre },
        { label: "Crianza",     valor: producto.crianzaNombre },
        { label: "Elaboración", valor: producto.elaboracionNombre },
        { label: "Medida",      valor: producto.medidaNombre },
      ].map(({ label, valor }) => (
        <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px" }}>
          <span style={{ color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>{label}</span>
          <span style={{ color: "var(--neutral)" }}>{valor}</span>
        </div>
      ))}
    </div>
  </div>
);

export default InfoProducto;
