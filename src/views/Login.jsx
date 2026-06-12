import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/slices/authSlice";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
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
    setError("");
    const result = await dispatch(loginThunk({ username: form.username, password: form.password }));
    setCargando(false);
    if (loginThunk.fulfilled.match(result)) {
      const sesion = result.payload;
      if (sesion.rol === "admin") navigate("/admin");
      else navigate(from);
    } else {
      setError(result.error?.message || "Usuario o contraseña incorrectos.");
    }
  };

  return <LoginForm form={form} setForm={setForm} error={error} cargando={cargando} onSubmit={handleSubmit} />;
};

export default Login;
