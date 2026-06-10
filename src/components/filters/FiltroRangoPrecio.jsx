const FiltroRangoPrecio = ({ precioMin, precioMax, onChange }) => (
  <div style={{ marginBottom: "24px" }}>
    <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
      Rango de precio
    </p>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
      <span>${precioMin.toLocaleString()}</span>
      <span>${precioMax.toLocaleString()}</span>
    </div>
    <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>Desde</p>
    <input
      type="range" min={0} max={100000} value={precioMin}
      onChange={(e) => onChange("precioMin", Number(e.target.value))}
      style={{ width: "100%", accentColor: "var(--primary)" }}
    />
    <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>Hasta</p>
    <input
      type="range" min={0} max={100000} value={precioMax}
      onChange={(e) => onChange("precioMax", Number(e.target.value))}
      style={{ width: "100%", accentColor: "var(--primary)" }}
    />
  </div>
);

export default FiltroRangoPrecio;
