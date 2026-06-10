import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError("Completá todos los campos."); return; }
    setCargando(true);
    const sesion = await login(form.username, form.password);
    setCargando(false);
    if (sesion) {
      if (sesion.rol === "admin") navigate("/admin");
      else navigate(from);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return <LoginForm form={form} setForm={setForm} error={error} cargando={cargando} onSubmit={handleSubmit} />;
};

export default Login;
