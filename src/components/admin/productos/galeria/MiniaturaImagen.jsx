const MiniaturaImagen = ({ url, esPrincipal, onSetPrincipal, onEliminar }) => (
  <div style={{ position: "relative", width: "72px", flexShrink: 0 }}>
    <img src={url} alt="" style={{ width: "72px", height: "72px", objectFit: "cover", border: `2px solid ${esPrincipal ? "var(--primary)" : "var(--border)"}` }} />
    {esPrincipal ? (
      <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--primary)", color: "white", fontSize: "8px", textAlign: "center", padding: "2px", letterSpacing: "0.5px" }}>
        PRINCIPAL
      </span>
    ) : (
      <button type="button" onClick={() => onSetPrincipal(url)}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "white", border: "none", fontSize: "8px", cursor: "pointer", padding: "2px", letterSpacing: "0.5px" }}>
        PRINCIPAL
      </button>
    )}
    <button type="button" onClick={() => onEliminar(url)}
      style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.6)", color: "white", border: "none", width: "18px", height: "18px", cursor: "pointer", fontSize: "13px", lineHeight: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
      ×
    </button>
  </div>
);

export default MiniaturaImagen;
