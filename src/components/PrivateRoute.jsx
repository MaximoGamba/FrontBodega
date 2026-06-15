import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import { tokenExpirado } from "@/redux/api";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const usuario  = useSelector((state) => state.auth.usuario);
  const token    = useSelector((state) => state.auth.token);
  const expirado = tokenExpirado(token);

  useEffect(() => {
    if (expirado) dispatch(logout());
  }, [expirado, dispatch]);

  if (!usuario || expirado) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
