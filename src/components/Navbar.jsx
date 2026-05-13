import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { LuSearch, LuUser, LuShoppingBag } from "react-icons/lu";

const Navbar = () => {
  const { carrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const [searchAbierto, setSearchAbierto] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      navigate(`/productos?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchAbierto(false);
      setSearchValue("");
    }
    if (e.key === "Escape") {
      setSearchAbierto(false);
      setSearchValue("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ borderBottom: "1px solid #e0d9ce", padding: "16px 40px", position: "sticky", top: 0, background: "#f5f0e8", zIndex: 100 }}>
      <Link to="/" className="navbar-brand" style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: "700", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
        <img src="/favicon.svg?v=2" alt="logo" style={{ width: "28px", height: "28px" }} />
        ApiBodega
      </Link>

      <div className="collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav gap-4">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/productos" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sale" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)" }}>
              Ofertas
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
          {esAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link" style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--primary)", fontWeight: "600" }}>
                Panel Admin
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="d-flex align-items-center gap-3">
        {searchAbierto && (
          <input
            autoFocus
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            style={{ border: "none", borderBottom: "1px solid var(--border)", background: "transparent", padding: "4px 8px", fontSize: "14px", outline: "none", width: "180px", fontFamily: "var(--font-sans)" }}
          />
        )}
        <LuSearch size={20} style={{ cursor: "pointer", color: "var(--neutral)" }} onClick={() => setSearchAbierto(!searchAbierto)} />
        <Link to={usuario ? "/perfil" : "/login"} state={!usuario ? { from: "/perfil" } : undefined} style={{ color: "var(--neutral)" }}>
          <LuUser size={20} />
        </Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
