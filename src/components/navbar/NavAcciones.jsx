import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuUser, LuShoppingBag } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { limpiarCarritoAlLogout } from "../../redux/slices/carritoSlice";
import ModalConfirmar from "../ModalConfirmar";

const NavAcciones = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const carrito = useSelector((state) => state.carrito.items);
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const [modalLogout, setModalLogout] = useState(false);

  const confirmarLogout = () => setModalLogout(true);

  const handleLogout = () => {
    dispatch(limpiarCarritoAlLogout());
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {!esAdmin && (
        <Link to="/carrito" style={{ position: "relative", color: "var(--neutral)" }}>
          <LuShoppingBag size={20} />
          {totalItems > 0 && (
            <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "var(--primary)", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalItems}
            </span>
          )}
        </Link>
      )}
      <Link to={usuario ? "/perfil" : "/login"} style={{ color: "var(--neutral)" }}>
        <LuUser size={20} />
      </Link>
      {!usuario ? (
        <Link to="/login" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)", textDecoration: "none" }}>
          Iniciar sesión
        </Link>
      ) : (
        <button
          onClick={confirmarLogout}
          style={{ background: "none", border: "none", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)", cursor: "pointer", padding: 0 }}
        >
          Cerrar sesión
        </button>
      )}
      <ModalConfirmar
        visible={modalLogout}
        mensaje="¿Seguro que querés cerrar sesión?"
        textoConfirmar="Cerrar sesión"
        onConfirmar={() => { setModalLogout(false); handleLogout(); }}
        onCancelar={() => setModalLogout(false)}
      />
    </>
  );
};

export default NavAcciones;
