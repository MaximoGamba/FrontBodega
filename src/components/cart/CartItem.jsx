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

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const CartItem = ({ item, onCambiarCantidad, onEliminar }) => {
  const precioFinal    = calcularPrecioFinal(item.price, item.discountPercent);
  const enLimiteStock  = item.cantidad >= item.stock;

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
          <button
            onClick={() => onCambiarCantidad(item.id, -1)}
            style={{ ...btnCantidad, color: item.cantidad === 1 ? "var(--primary)" : "inherit" }}
            title={item.cantidad === 1 ? "Quitar del carrito" : "Disminuir cantidad"}
          >
            {item.cantidad === 1 ? <TrashIcon /> : "−"}
          </button>
          <span style={{ fontSize: "15px", minWidth: "20px", textAlign: "center" }}>
            {item.cantidad}
          </span>
          <button
            onClick={() => onCambiarCantidad(item.id, 1)}
            disabled={enLimiteStock}
            style={{ ...btnCantidad, opacity: enLimiteStock ? 0.4 : 1, cursor: enLimiteStock ? "not-allowed" : "pointer" }}
            title={enLimiteStock ? "Stock máximo alcanzado" : "Aumentar cantidad"}
          >
            +
          </button>
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
