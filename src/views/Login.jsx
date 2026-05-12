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

const Login = () => { //Login es el componente que se encarga de la pagina de login
  const { login } = useAuth(); //login es el estado del usuario logueado
  const navigate = useNavigate(); //navigate es la funcion que se encarga de navegar entre las paginas
  const location = useLocation(); //location es la funcion que se encarga de obtener la location de la pagina
  const from = location.state?.from || "/"; //from es la location de la pagina anterior
  const [form, setForm] = useState({ email: "", password: "" }); //form es el estado del formulario
  const [error, setError] = useState(""); //error es el estado del error

  const handleSubmit = (e) => { //e es el evento que se disparo el formulario
    e.preventDefault(); //evitar que se recargue la pagina
    if (!form.email || !form.password) { //si el email o la contraseña no estan completos, se setea el error
      setError("Completá todos los campos.");
      return;
    }
    login(form.email, form.password); //login es la funcion que se encarga de loguear al usuario
    navigate(from); //navigate es la funcion que se encarga de navegar entre las paginas
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}> //onSubmit es el evento que se disparo el formulario
          <div>
            <label style={labelStyle}>Email</label> //label es el label del formulario
            <input
              style={inputStyle} //inputStyle es el estilo del input
              type="email"
              value={form.email} //value es el valor del input
              onChange={(e) => setForm({ ...form, email: e.target.value })} //onChange es el evento que se disparo el input
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
