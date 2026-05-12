import { useState } from "react"; //Dom Virtual React
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Imagen al costado del formulario (reemplazá por tu URL) */
const LOGIN_SIDE_IMAGE_URL =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=900&q=80";

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
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "#f5f0e8",
      }}
    >
      <div
        className="row g-0 w-100 shadow-sm"
        style={{
          maxWidth: "880px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--white)",
        }}
      >
        <div className="col-12 col-md-5 col-lg-6 p-0" style={{ minHeight: "260px" }}>
          <img
            src={LOGIN_SIDE_IMAGE_URL}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              minHeight: "260px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <div className="col-12 col-md-7 col-lg-6" style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", textAlign: "center", marginBottom: "8px" }}>
            Iniciar sesión
          </h1>
          <p style={{ textAlign: "center", color: "var(--gray)", fontSize: "14px", marginBottom: "36px" }}>
            Accedé a tu cuenta para gestionar tus pedidos
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
    </div>
  );
};

export default Login;
