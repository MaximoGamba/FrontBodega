import { Link } from "react-router-dom";
import { inputStyle, labelStyle } from "../../styles/authStyles";

const LoginForm = ({ form, setForm, error, cargando, onSubmit }) => (
  <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
        Iniciar sesión
      </h1>
      <p style={{ textAlign: "center", color: "var(--gray)", fontSize: "14px", marginBottom: "36px" }}>
        Accedé a tu cuenta para gestionar tus pedidos
      </p>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={labelStyle}>Usuario</label>
          <input
            style={inputStyle}
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
          />
        </div>
        <div>
          <label style={labelStyle}>Contraseña</label>
          <input
            style={inputStyle}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
        </div>

        {error && <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0" }}>{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: cargando ? "not-allowed" : "pointer", opacity: cargando ? 0.7 : 1, marginTop: "4px" }}
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray)", marginTop: "24px" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/registro" style={{ color: "var(--primary)", textDecoration: "none" }}>Registrate</Link>
      </p>
    </div>
  </div>
);

export default LoginForm;
