import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, limpiarError } from "@/redux/authSlice";
import { ROL_ADMIN } from "@/utils/roles";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { loading, error: authError } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(limpiarError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError("Completá todos los campos."); return; }
    setError("");
    const result = await dispatch(loginThunk({ username: form.username, password: form.password }));
    if (loginThunk.fulfilled.match(result)) {
      const { usuario } = result.payload;
      if (usuario.rol === ROL_ADMIN) navigate("/admin");
      else navigate(from);
    }
  };

  return <LoginForm form={form} setForm={setForm} error={error || authError} cargando={loading} onSubmit={handleSubmit} />;
};

export default Login;
