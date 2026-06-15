import { Link } from "react-router-dom";
import { calcularPrecioFinal } from "../../utils/formatters";

const btnCantidad = {
  width: "28px",
  height: "28px",
  border: "1px solid var(--border)",
  background: "white",
  cursor: "pointer",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CartItem = ({ item, onCambiarCantidad, onEliminar }) => {
  const precioFinal = calcularPrecioFinal(item.price, item.discountPercent);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "20px", alignItems: "center", padding: "20px 0", borderBottom: "1px solid var(--border)" }}
    >
      <Link to={`/productos/${item.id}`}>
        <div style={{ width: "100px", height: "130px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={item.imagen}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
          />
        </div>
      </Link>

      <div>
        <Link to={`/productos/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "17px", marginBottom: "4px" }}>
            {item.name}
          </p>
        </Link>
        <p style={{ fontSize: "13px", color: "var(--gray)", marginBottom: "8px" }}>
          Precio unitario: ${precioFinal.toLocaleString()}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={() => onCambiarCantidad(item.id, -1)} style={btnCantidad}>−</button>
          <span style={{ fontSize: "15px", minWidth: "20px", textAlign: "center" }}>
            {item.cantidad}
          </span>
          <button onClick={() => onCambiarCantidad(item.id, 1)} style={btnCantidad}>+</button>
          <button
            onClick={() => onEliminar(item.id)}
            style={{ background: "none", border: "none", color: "var(--gray)", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", marginLeft: "8px" }}
          >
            Eliminar
          </button>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        {item.discountPercent > 0 && (
          <p style={{ fontSize: "12px", color: "var(--gray)", textDecoration: "line-through", marginBottom: "2px" }}>
            ${(item.price * item.cantidad).toLocaleString()}
          </p>
        )}
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          ${(precioFinal * item.cantidad).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
