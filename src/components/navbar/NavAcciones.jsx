import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LuUser, LuShoppingBag } from "react-icons/lu";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const NavAcciones = () => {
  const { carrito } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const confirmarLogout = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Seguro que querés cerrar sesión?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => { closeToast(); logout(); navigate("/"); toast.success("Sesión cerrada correctamente", { position: "top-center" }); }}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Cerrar sesión
            </button>
            <button onClick={closeToast} style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, closeButton: false, toastId: "cerrar-sesion" }
    );
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
    </>
  );
};

export default NavAcciones;
