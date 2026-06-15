import { useState } from "react";
import { useDispatch } from "react-redux";
import { putUsuario } from "@/redux/usuarioSlice";
import { inputStyle, labelStyle } from "../../styles/profileStyles";
import Boton from "../shared/Boton";

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
    const result = await dispatch(putUsuario({ userId, datos: { currentPassword: form.actual, password: form.nueva } }));
    setGuardando(false);
    if (putUsuario.fulfilled.match(result)) {
      setExito(true);
      setForm({ actual: "", nueva: "", confirmar: "" });
      setTimeout(() => { setExito(false); setAbierto(false); }, 2000);
    } else {
      const msg = result.payload || "";
      if (msg.toLowerCase().includes("incorrecta") || msg.toLowerCase().includes("actual")) {
        setError(msg || "La contraseña actual es incorrecta.");
      } else {
        setError("Error al cambiar la contraseña.");
      }
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
      {[
        { label: "Contraseña actual", campo: "actual", autoComplete: "current-password" },
        { label: "Nueva contraseña",  campo: "nueva",  autoComplete: "new-password" },
        { label: "Confirmar contraseña", campo: "confirmar", autoComplete: "new-password" },
      ].map(({ label, campo, autoComplete }) => (
        <div key={campo} style={{ marginBottom: "12px" }}>
          <p style={labelStyle}>{label}</p>
          <input
            style={inputStyle}
            type="password"
            value={form[campo]}
            autoComplete={autoComplete}
            onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
          />
        </div>
      ))}
      {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
      {exito && <p style={{ fontSize: "12px", color: "green", marginBottom: "8px" }}>Contraseña actualizada.</p>}
      <div style={{ display: "flex", gap: "8px" }}>
        <Boton variante="primario" tamaño="sm" disabled={guardando} onClick={guardar}>
          {guardando ? "Guardando..." : "Guardar"}
        </Boton>
        <Boton variante="secundario" tamaño="sm" onClick={() => { setAbierto(false); setError(""); setForm({ actual: "", nueva: "", confirmar: "" }); }}>
          Cancelar
        </Boton>
      </div>
    </div>
  );
};

export default CambiarPassword;
