const EstadoCarga = ({ cargando, error, children }) => {
  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <div style={{
          width: "32px", height: "32px", margin: "0 auto",
          border: "3px solid var(--border)",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <p style={{ color: "var(--error, #dc3545)", fontSize: "14px" }}>{error}</p>
      </div>
    );
  }

  return children;
};

export default EstadoCarga;
