import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const LINKS = [
  { label: "Inicio",          to: "/" },
  { label: "Catálogo",        to: "/productos" },
  { label: "Ofertas",         to: "/ofertas" },
  { label: "Nuestra Historia",to: "/historia" },
  { label: "Contacto",        to: "/contacto" },
];

const NavLinks = () => {
  const { pathname } = useLocation();
  const usuario = useSelector((state) => state.auth.usuario);
  const esAdmin = usuario?.rol === "admin";

  const linkStyle = (to) => ({
    fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)",
    borderBottom: pathname === to ? "2px solid var(--primary)" : "2px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <ul className="navbar-nav gap-4">
      {LINKS.map(({ label, to }) => (
        <li key={to} className="nav-item">
          <Link to={to} className="nav-link" style={linkStyle(to)}>{label}</Link>
        </li>
      ))}
      {esAdmin && (
        <li className="nav-item">
          <Link to="/admin" className="nav-link" style={{ ...linkStyle("/admin"), color: "var(--primary)", fontWeight: "600" }}>
            Panel Admin
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
