import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrarThunk, limpiarError } from "@/redux/authSlice";
import RegisterForm from "../components/auth/RegisterForm";

const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { loading, error: authError } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", username: "", password: "", confirmar: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(limpiarError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, username, password, confirmar } = form;
    if (!firstname || !lastname || !email || !username || !password || !confirmar) {
      setError("Completá todos los campos."); return;
    }
    if (password !== confirmar) { setError("Las contraseñas no coinciden."); return; }
    setError("");
    const result = await dispatch(registrarThunk({ firstname, lastname, email, username, password }));
    if (registrarThunk.fulfilled.match(result)) navigate(from);
  };

  return <RegisterForm form={form} setForm={setForm} error={error || authError} cargando={loading} onSubmit={handleSubmit} />;
};

export default Registro;
