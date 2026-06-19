import { Link } from "react-router-dom";
import { inputStyle, labelStyle } from "../../styles/authStyles";
import Boton from "../shared/Boton";

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

        <Boton type="submit" variante="primario" tamaño="lg" disabled={cargando} style={{ marginTop: "4px", width: "100%" }}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </Boton>
      </form>

      <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray)", marginTop: "24px" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/registro" style={{ color: "var(--primary)", textDecoration: "none" }}>Registrate</Link>
      </p>
    </div>
  </div>
);

export default LoginForm;
