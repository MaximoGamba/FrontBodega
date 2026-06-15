import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { ROL_ADMIN } from "@/utils/roles";
import CarritoIcono from "./CarritoIcono";
import BotonLogout from "./BotonLogout";

const NavAcciones = () => {
  // Selectores granulares: cada uno re-renderiza solo por su dato específico
  const usuario = useSelector((state) => state.auth.usuario);
  const esAdmin = useSelector((state) => state.auth.usuario?.rol === ROL_ADMIN);
  const totalItems = useSelector((state) =>
    state.carrito.items.reduce((acc, item) => acc + item.cantidad, 0)
  );

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
