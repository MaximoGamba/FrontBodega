import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavAcciones from "./NavAcciones";

const Navbar = () => (
  <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e0d9ce", padding: "16px 40px", position: "sticky", top: 0, background: "#f5f0e8", zIndex: 100 }}>
    <NavLogo />
    <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
      <NavLinks />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <NavSearch />
      <NavAcciones />
    </div>
  </nav>
);

export default Navbar;
