import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrarThunk } from "../redux/slices/authSlice";
import RegisterForm from "../components/auth/RegisterForm";

const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", username: "", password: "", confirmar: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, username, password, confirmar } = form;
    if (!firstname || !lastname || !email || !username || !password || !confirmar) {
      setError("Completá todos los campos."); return;
    }
    if (password !== confirmar) { setError("Las contraseñas no coinciden."); return; }
    setCargando(true);
    setError("");
    const result = await dispatch(registrarThunk({ firstname, lastname, email, username, password }));
    setCargando(false);
    if (registrarThunk.fulfilled.match(result)) navigate(from);
    else setError(result.error?.message || "Error al registrarse. El usuario o email puede estar en uso.");
  };

  return <RegisterForm form={form} setForm={setForm} error={error} cargando={cargando} onSubmit={handleSubmit} />;
};

export default Registro;
