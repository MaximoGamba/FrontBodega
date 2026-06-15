import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROL_ADMIN } from "@/utils/roles";
import { NAV_LINKS } from "@/data/links";

const NavLinks = () => {
  const { pathname } = useLocation();
  const usuario = useSelector((state) => state.auth.usuario);
  const esAdmin = usuario?.rol === ROL_ADMIN;

  const linkStyle = (to) => ({
    fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--neutral)",
    borderBottom: pathname === to ? "2px solid var(--primary)" : "2px solid transparent",
    paddingBottom: "2px",
  });

  return (
    <ul style={{ display: "flex", gap: "24px", listStyle: "none", padding: 0, margin: 0 }}>
      {NAV_LINKS.map(({ label, to }) => (
        <li key={to}>
          <Link to={to} style={linkStyle(to)}>{label}</Link>
        </li>
      ))}
      {esAdmin && (
        <li>
          <Link to="/admin" style={{ ...linkStyle("/admin"), color: "var(--primary)", fontWeight: "600" }}>
            Panel Admin
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
