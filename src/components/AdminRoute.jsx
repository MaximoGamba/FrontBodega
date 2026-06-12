import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { limpiarCarritoAlLogout } from "../redux/slices/carritoSlice";

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
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== "admin") return <Navigate to="/" replace />;

  if (tokenExpirado()) {
    dispatch(limpiarCarritoAlLogout());
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
