import { Link } from "react-router-dom";
import { inputStyle, labelStyle } from "../../styles/authStyles";
import Boton from "../shared/Boton";

const RegisterForm = ({ form, setForm, error, cargando, onSubmit }) => (
  <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
        Crear cuenta
      </h1>
      <p style={{ textAlign: "center", color: "var(--gray)", fontSize: "14px", marginBottom: "36px" }}>
        Registrate para gestionar tus pedidos
      </p>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={labelStyle}>Nombre</label>
          <input style={inputStyle} value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Apellido</label>
          <input style={inputStyle} value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Usuario</label>
          <input style={inputStyle} type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} autoComplete="username" />
        </div>
        <div>
          <label style={labelStyle}>Contraseña</label>
          <input style={inputStyle} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="new-password" />
        </div>
        <div>
          <label style={labelStyle}>Confirmar contraseña</label>
          <input style={inputStyle} type="password" value={form.confirmar} onChange={(e) => setForm({ ...form, confirmar: e.target.value })} autoComplete="new-password" />
        </div>

        {error && <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0" }}>{error}</p>}

        <Boton type="submit" variante="primario" tamaño="lg" disabled={cargando} style={{ marginTop: "4px", width: "100%" }}>
          {cargando ? "Registrando..." : "Registrarse"}
        </Boton>
      </form>

      <p style={{ textAlign: "center", fontSize: "13px", color: "var(--gray)", marginTop: "24px" }}>
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none" }}>Iniciá sesión</Link>
      </p>
    </div>
  </div>
);

export default RegisterForm;
