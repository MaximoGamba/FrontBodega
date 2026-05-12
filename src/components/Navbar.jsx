import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { LuSearch, LuUser, LuShoppingBag } from "react-icons/lu";
import logoEmpresa from "../assets/Logo.png";

const Navbar = () => {
  const { carrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const qEnUrl = searchParams.get("q") ?? "";
  const [query, setQuery] = useState("");
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    if (location.pathname === "/productos") {
      setQuery(qEnUrl);
    } else {
      setQuery("");
    }
  }, [location.pathname, qEnUrl]);

  const handleBuscar = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/productos?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/productos");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ borderBottom: "1px solid #e0d9ce", padding: "16px 40px", position: "sticky", top: 0, background: "#f5f0e8", zIndex: 100 }}>
      <Link to="/" className="navbar-brand d-flex align-items-center" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <img
          src={logoEmpresa}
          alt="ApiBodega — Inicio"
          style={{ height: "60px", width: "auto", maxWidth: "220px", objectFit: "contain", display: "block" }}
        />
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
        <form onSubmit={handleBuscar} className="d-flex align-items-center gap-1" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "4px", minWidth: "160px", maxWidth: "240px" }}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar vinos..."
            aria-label="Buscar en el catálogo"
            style={{
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              fontSize: "13px",
              outline: "none",
              fontFamily: "var(--font-sans)",
              color: "var(--neutral)",
            }}
          />
          <button type="submit" aria-label="Buscar" style={{ border: "none", background: "none", padding: 0, display: "flex", color: "var(--neutral)", cursor: "pointer" }}>
            <LuSearch size={20} />
          </button>
        </form>
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
