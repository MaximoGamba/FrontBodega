import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { tokenExpirado } from "@/redux/api";
import { ROL_ADMIN } from "@/utils/roles";

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { usuario, token } = useSelector((state) => state.auth);
  const expirado = tokenExpirado(token);

  useEffect(() => {
    if (expirado) dispatch(logout());
  }, [expirado, dispatch]);

  if (!usuario || expirado) return <Navigate to="/login" replace />;
  if (usuario.rol !== ROL_ADMIN) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
