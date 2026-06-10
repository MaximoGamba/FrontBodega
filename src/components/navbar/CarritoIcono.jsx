import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";

const CarritoIcono = ({ totalItems }) => (
  <Link to="/carrito" style={{ position: "relative", color: "var(--neutral)" }}>
    <LuShoppingBag size={20} />
    {totalItems > 0 && (
      <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "var(--primary)", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {totalItems}
      </span>
    )}
  </Link>
);

export default CarritoIcono;
