import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ producto, colores, cepas }) => {
  const { carrito, setCarrito } = useCart();
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === "admin";

  const color = colores.find((c) => c.id === producto.colorId)?.nombre || "";
  const cepa = cepas.find((c) => c.id === producto.cepaId)?.nombre || "";

  const precioFinal = producto.discountPercent > 0
    ? producto.price * (1 - producto.discountPercent / 100)
    : producto.price;

  const agregarAlCarrito = () => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Link to={`/productos/${producto.id}`}>
        <div style={{ position: "relative", marginBottom: "12px", overflow: "hidden" }}>
          <img
            src={producto.imagen}
            alt={producto.name}
            style={{ width: "100%", height: "280px", objectFit: "cover" }}
          />
          {producto.stock === 0 && (
            <span style={{ position: "absolute", top: "12px", right: "12px", background: "#1A1A1A", color: "white", fontSize: "11px", padding: "4px 10px", letterSpacing: "1px" }}>
              AGOTADO
            </span>
          )}
          {producto.discountPercent > 0 && (
            <span style={{ position: "absolute", top: "12px", left: "12px", background: "var(--primary)", color: "white", fontSize: "11px", padding: "4px 10px", letterSpacing: "1px" }}>
              -{producto.discountPercent}%
            </span>
          )}
        </div>
        <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "4px" }}>
          {color} · {cepa}
        </p>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", marginBottom: "4px" }}>
          {producto.name}
        </h3>
        <p style={{ fontSize: "14px", color: "var(--neutral)" }}>
          {producto.discountPercent > 0 && (
            <span style={{ textDecoration: "line-through", color: "var(--gray)", marginRight: "8px" }}>
              ${producto.price.toLocaleString()}
            </span>
          )}
          ${precioFinal.toLocaleString()}
        </p>
      </Link>
      {producto.stock > 0 && !esAdmin && (
        <button onClick={agregarAlCarrito} style={{ marginTop: "8px", width: "100%", background: "var(--primary)", color: "white", border: "none", padding: "10px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
          Agregar
        </button>
      )}
    </div>
  );
};

export default ProductCard;
