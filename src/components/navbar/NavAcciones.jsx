import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { ROL_ADMIN } from "@/utils/roles";
import CarritoIcono from "./CarritoIcono";
import BotonLogout from "./BotonLogout";

const NavAcciones = () => {
  const usuario = useSelector((state) => state.auth.usuario);
  const esAdmin = usuario?.rol === ROL_ADMIN;
  const totalItems = useSelector((state) =>
    state.carrito.items.reduce((acc, item) => acc + item.cantidad, 0)
  );

  return (
    <>
      {!esAdmin && <CarritoIcono totalItems={totalItems} />}
      {usuario ? (
        <>
          <Link to="/perfil" style={{ color: "var(--neutral)" }}>
            <LuUser size={20} />
          </Link>
          <BotonLogout />
        </>
      ) : (
        <Link to="/login" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)", textDecoration: "none" }}>
          Iniciar sesión
        </Link>
      )}
    </>
  );
};

export default NavAcciones;
