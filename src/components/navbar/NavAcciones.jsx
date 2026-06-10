import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CarritoIcono from "./CarritoIcono";
import BotonLogout from "./BotonLogout";

const NavAcciones = () => {
  const { carrito } = useCart();
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === "admin";
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {!esAdmin && <CarritoIcono totalItems={totalItems} />}
      <Link to={usuario ? "/perfil" : "/login"} style={{ color: "var(--neutral)" }}>
        <LuUser size={20} />
      </Link>
      {!usuario ? (
        <Link to="/login" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)", textDecoration: "none" }}>
          Iniciar sesión
        </Link>
      ) : (
        <BotonLogout />
      )}
    </>
  );
};

export default NavAcciones;
