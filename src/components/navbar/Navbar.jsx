import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import NavSearch from "./NavSearch";
import NavAcciones from "./NavAcciones";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg" style={{ borderBottom: "1px solid #e0d9ce", padding: "16px 40px", position: "sticky", top: 0, background: "#f5f0e8", zIndex: 100 }}>
    <NavLogo />
    <div className="collapse navbar-collapse justify-content-center">
      <NavLinks />
    </div>
    <div className="d-flex align-items-center gap-3">
      <NavSearch />
      <NavAcciones />
    </div>
  </nav>
);

export default Navbar;
