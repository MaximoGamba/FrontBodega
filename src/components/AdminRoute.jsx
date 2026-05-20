import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const tokenExpirado = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const AdminRoute = ({ children }) => {
  const { usuario, logout } = useAuth();

  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== "admin") return <Navigate to="/" replace />;

  if (tokenExpirado()) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
