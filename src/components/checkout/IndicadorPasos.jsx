const pasos = ["Envío", "Pago", "Confirmación"];

const IndicadorPasos = ({ paso }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
    {pasos.map((nombre, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: i <= paso ? "var(--primary)" : "var(--border)",
            color: i <= paso ? "white" : "var(--gray)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: "600",
          }}>
            {i + 1}
          </div>
          <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: i <= paso ? "var(--primary)" : "var(--gray)" }}>
            {nombre}
          </span>
        </div>
        {i < pasos.length - 1 && (
          <div style={{ width: "80px", height: "1px", background: "var(--border)", margin: "0 12px", marginBottom: "20px" }} />
        )}
      </div>
    ))}
  </div>
);

export default IndicadorPasos;
