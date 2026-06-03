import { useState } from "react";
import { actualizarUsuario } from "../../services/api";

const labelStyle = {
  fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase",
  color: "var(--gray)", marginBottom: "6px",
};

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "10px 12px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const CampoEditable = ({ label, valor, campo, userId, onGuardado }) => {
  const [editando, setEditando] = useState(false);
  const [input, setInput] = useState(valor || "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const guardar = async () => {
    if (!input.trim()) return;
    setGuardando(true);
    setError("");
    try {
      const actualizado = await actualizarUsuario(userId, { [campo]: input.trim() });
      if (actualizado?.error) { setError("Error al guardar."); return; }
      onGuardado(actualizado);
      setEditando(false);
    } catch {
      setError("Error al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  const cancelar = () => {
    setInput(valor || "");
    setError("");
    setEditando(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={labelStyle}>{label}</p>
      {editando ? (
        <div>
          <input
            autoFocus
            style={{ ...inputStyle, marginBottom: "8px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={guardar}
              disabled={guardando}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", opacity: guardando ? 0.7 : 1 }}
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={cancelar}
              style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "15px", margin: 0 }}>{valor || "—"}</p>
          <button
            onClick={() => { setInput(valor || ""); setEditando(true); }}
            style={{ background: "none", border: "none", fontSize: "12px", color: "var(--gray)", cursor: "pointer", textDecoration: "underline" }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default CampoEditable;
