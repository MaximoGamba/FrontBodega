import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const usuario = useSelector((state) => state.auth.usuario);
  if (!usuario) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
