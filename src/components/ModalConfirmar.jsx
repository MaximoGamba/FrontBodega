const ModalConfirmar = ({ visible, mensaje, onConfirmar, onCancelar, textoConfirmar = "Confirmar", textoCancelar = "Cancelar", peligroso = false }) => {
  if (!visible) return null;

  return (
    <div
      onClick={onCancelar}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", padding: "36px 40px", maxWidth: "420px", width: "90%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", marginBottom: "28px", color: "var(--neutral)", lineHeight: 1.4 }}>
          {mensaje}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={onCancelar}
            style={{
              background: "white", color: "var(--neutral)", border: "1px solid var(--border)",
              padding: "10px 24px", fontSize: "12px", letterSpacing: "1px",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {textoCancelar}
          </button>
          <button
            onClick={onConfirmar}
            style={{
              background: peligroso ? "#c0392b" : "var(--primary)", color: "white", border: "none",
              padding: "10px 24px", fontSize: "12px", letterSpacing: "1px",
              textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmar;
