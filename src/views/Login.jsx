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

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Completá todos los campos.");
      return;
    }
    login(form.username, form.password)
      .then((ok) => {
        if (ok) navigate(from);
        else setError("Email o contraseña incorrectos.");
      });
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
          Iniciar sesión
        </h1>
        <p style={{ textAlign: "center", color: "var(--gray)", fontSize: "14px", marginBottom: "36px" }}>
          Accedé a tu cuenta para gestionar tus pedidos
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Usuario</label>
            <input
              style={inputStyle}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
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

          {error && (
            <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", marginTop: "4px" }}
          >
            Ingresar
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray)", marginTop: "24px" }}>
          ¿No tenés cuenta?{" "}
          <Link to="/registro" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
