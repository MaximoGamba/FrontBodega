import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { carrito, setCarrito } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const cambiarCantidad = (id, delta) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const subtotal = carrito.reduce((acc, item) => {
    const precioFinal =
      item.discountPercent > 0
        ? item.price * (1 - item.discountPercent / 100)
        : item.price;
    return acc + precioFinal * item.cantidad;
  }, 0);

  if (carrito.length === 0) {
    return (
      <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "16px" }}>
          Tu carrito está vacío
        </p>
        <p style={{ color: "var(--gray)", marginBottom: "32px" }}>
          Explorá nuestro catálogo y encontrá el vino perfecto.
        </p>
        <Link
          to="/productos"
          style={{ background: "var(--primary)", color: "white", padding: "14px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none" }}
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>
        Tu carrito
      </h1>
      <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        {carrito.reduce((a, i) => a + i.cantidad, 0)} producto(s)
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "start" }}>
        {/* Lista de productos */}
        <div>
          {carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onCambiarCantidad={cambiarCantidad}
              onEliminar={eliminar}
            />
          ))}
        </div>

        {/* Resumen */}
        <div style={{ border: "1px solid var(--border)", padding: "28px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
            Resumen del pedido
          </p>

          {carrito.map((item) => {
            const precioFinal =
              item.discountPercent > 0
                ? item.price * (1 - item.discountPercent / 100)
                : item.price;
            return (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px", color: "var(--gray)" }}>
                <span>{item.name} × {item.cantidad}</span>
                <span>${(precioFinal * item.cantidad).toLocaleString()}</span>
              </div>
            );
          })}

          <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontWeight: "600", fontSize: "16px" }}>
            <span>Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <button
            onClick={() => navigate(usuario ? "/checkout" : "/login", !usuario ? { state: { from: "/" } } : undefined)}
            style={{ display: "block", width: "100%", marginTop: "24px", background: "var(--primary)", color: "white", border: "none", padding: "14px", textAlign: "center", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
          >
            Finalizar compra
          </button>

          <Link
            to="/productos"
            style={{ display: "block", marginTop: "12px", textAlign: "center", fontSize: "12px", color: "var(--gray)", letterSpacing: "1px", textDecoration: "none" }}
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
