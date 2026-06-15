import { Link } from "react-router-dom";

const NavLogo = () => (
  <Link to="/" style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: "700", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
    <img src="/favicon.svg?v=2" alt="logo" style={{ width: "28px", height: "28px" }} />
    ApiBodega
  </Link>
);

export default NavLogo;
