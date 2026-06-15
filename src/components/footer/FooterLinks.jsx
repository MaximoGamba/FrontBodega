import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/data/links";

const FooterLinks = () => (
  <div>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
      Categorías
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {NAV_LINKS.map(({ label, to }) => (
        <Link key={to} to={to} style={{ fontSize: "14px", color: "var(--gray)", textDecoration: "none" }}>
          {label}
        </Link>
      ))}
    </div>
  </div>
);

export default FooterLinks;
