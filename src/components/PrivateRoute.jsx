import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenExpirado } from "@/redux/api";

const PrivateRoute = ({ children }) => {
  const usuario = useSelector((state) => state.auth.usuario);
  const token   = useSelector((state) => state.auth.token);
  if (!usuario || tokenExpirado(token)) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
