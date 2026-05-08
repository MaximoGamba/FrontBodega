import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { LuSearch, LuUser, LuShoppingBag } from "react-icons/lu";

const Navbar = () => {
  const { carrito } = useCart();
  const { usuario } = useAuth();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg" style={{ borderBottom: "1px solid #e0d9ce", padding: "16px 40px", position: "sticky", top: 0, background: "#f5f0e8", zIndex: 100 }}>
      <Link to="/" className="navbar-brand" style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: "700", color: "var(--primary)" }}>
        ApiBodega
      </Link>

      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav gap-4">
          <li className="nav-item">
            <Link to="/productos" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sale" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Sale
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/historia" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Nuestra Historia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center gap-3">
        <LuSearch size={20} style={{ cursor: "pointer", color: "var(--neutral)" }} />
        <Link to={usuario ? "/perfil" : "/login"} state={!usuario ? { from: "/perfil" } : undefined} style={{ color: "var(--neutral)" }}>
          <LuUser size={20} />
        </Link>
        <Link to="/carrito" style={{ position: "relative", color: "var(--neutral)" }}>
          <LuShoppingBag size={20} />
          {totalItems > 0 && (
            <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "var(--primary)", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
