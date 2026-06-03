import { Link } from "react-router-dom";

const LINKS = [
  { label: "Inicio",           to: "/" },
  { label: "Productos",        to: "/productos" },
  { label: "Ofertas",          to: "/ofertas" },
  { label: "Nuestra Historia", to: "/historia" },
  { label: "Contacto",         to: "/contacto" },
];

const FooterLinks = () => (
  <div>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
      Categorías
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {LINKS.map(({ label, to }) => (
        <Link key={to} to={to} style={{ fontSize: "14px", color: "var(--gray)", textDecoration: "none" }}>
          {label}
        </Link>
      ))}
    </div>
  </div>
);

export default FooterLinks;
