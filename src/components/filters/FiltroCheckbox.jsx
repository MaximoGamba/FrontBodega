const FiltroCheckbox = ({ label, campo, opciones, filtros, onCheckbox }) => {
  if (opciones.length === 0) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
        {label}
      </p>
      {opciones.map((op) => (
        <label key={op.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
          <input
            type="checkbox"
            value={op.id}
            checked={filtros[campo].includes(op.id)}
            onChange={(e) => onCheckbox(campo, e.target.value)}
            style={{ accentColor: "var(--primary)", width: "16px", height: "16px" }}
          />
          {op.name}
        </label>
      ))}
    </div>
  );
};

export default FiltroCheckbox;
