import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  padding: "12px 14px",
  fontSize: "14px",
  fontFamily: "var(--font-sans)",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--gray)",
  display: "block",
  marginBottom: "6px",
};

const Registro = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", confirmar: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstname || !form.lastname || !form.username || !form.email || !form.password || !form.confirmar) {
      setError("Completá todos los campos.");
      return;
    }
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    registrar(form.firstname, form.lastname, form.username, form.email, form.password)
      .then((ok) => {
        if (ok) navigate(from);
        else setError("Error al registrarse. Intentá de nuevo.");
      });
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
          Crear cuenta
        </h1>
        <p style={{ textAlign: "center", color: "var(--gray)", fontSize: "14px", marginBottom: "36px" }}>
          Registrate para gestionar tus pedidos
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input
              style={inputStyle}
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Apellido</label>
            <input
              style={inputStyle}
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Usuario</label>
            <input
              style={inputStyle}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              style={inputStyle}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input
              style={inputStyle}
              type="password"
              value={form.confirmar}
              onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
            />
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", marginTop: "4px" }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray)", marginTop: "24px" }}>
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
