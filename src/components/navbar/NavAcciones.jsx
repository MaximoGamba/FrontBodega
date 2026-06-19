import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { ROL_ADMIN } from "@/utils/roles";
import CarritoIcono from "./CarritoIcono";
import BotonLogout from "./BotonLogout";

const NavAcciones = () => {
  const usuario = useSelector((state) => state.users.usuario);
  const esAdmin = usuario?.rol === ROL_ADMIN;

  return (
    <>
      {!esAdmin && <CarritoIcono />}
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
