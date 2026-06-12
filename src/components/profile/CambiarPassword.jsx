import { useState } from "react";
import { useDispatch } from "react-redux";
import { actualizarUsuario } from "../../redux/slices/usuariosSlice";

const labelStyle = {
  fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase",
  color: "var(--gray)", marginBottom: "6px",
};

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "10px 12px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const CambiarPassword = ({ userId }) => {
  const dispatch = useDispatch();
  const [abierto, setAbierto] = useState(false);
  const [form, setForm] = useState({ actual: "", nueva: "", confirmar: "" });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const guardar = async () => {
    if (!form.actual) { setError("Ingresá tu contraseña actual."); return; }
    if (!form.nueva || !form.confirmar) { setError("Completá todos los campos."); return; }
    if (form.nueva !== form.confirmar) { setError("Las contraseñas nuevas no coinciden."); return; }
    if (form.nueva.length < 6) { setError("La contraseña nueva debe tener al menos 6 caracteres."); return; }
    setGuardando(true);
    setError("");
    try {
      await dispatch(actualizarUsuario({ userId, datos: { currentPassword: form.actual, password: form.nueva } })).unwrap();
      setExito(true);
      setForm({ actual: "", nueva: "", confirmar: "" });
      setTimeout(() => { setExito(false); setAbierto(false); }, 2000);
    } catch (err) {
      setError(err || "Error al cambiar la contraseña.");
    } finally {
      setGuardando(false);
    }
  };

  if (!abierto) {
    return (
      <div style={{ marginTop: "8px" }}>
        <button
          onClick={() => setAbierto(true)}
          style={{ background: "none", border: "none", fontSize: "13px", color: "var(--primary)", cursor: "pointer", padding: 0, textDecoration: "underline" }}
        >
          Cambiar contraseña
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
      <p style={{ ...labelStyle, marginBottom: "16px" }}>Cambiar contraseña</p>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Contraseña actual</p>
        <input style={inputStyle} type="password" value={form.actual} autoComplete="current-password" onChange={(e) => setForm({ ...form, actual: e.target.value })} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Nueva contraseña</p>
        <input style={inputStyle} type="password" value={form.nueva} autoComplete="new-password" onChange={(e) => setForm({ ...form, nueva: e.target.value })} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Confirmar contraseña</p>
        <input style={inputStyle} type="password" value={form.confirmar} autoComplete="new-password" onChange={(e) => setForm({ ...form, confirmar: e.target.value })} />
      </div>
      {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
      {exito && <p style={{ fontSize: "12px", color: "green", marginBottom: "8px" }}>Contraseña actualizada.</p>}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={guardar}
          disabled={guardando}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", opacity: guardando ? 0.7 : 1 }}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={() => { setAbierto(false); setError(""); setForm({ actual: "", nueva: "", confirmar: "" }); }}
          style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "8px 20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CambiarPassword;
