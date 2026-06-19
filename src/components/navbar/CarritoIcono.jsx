import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectTotalItems = createSelector(
  (state) => state.carrito.items,
  (items) => items.reduce((acc, item) => acc + item.cantidad, 0)
);

const CarritoIcono = () => {
  const totalItems = useSelector(selectTotalItems);
  return (
    <Link to="/carrito" style={{ position: "relative", color: "var(--neutral)" }}>
      <LuShoppingBag size={20} />
      {totalItems > 0 && (
        <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "var(--primary)", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CarritoIcono;
