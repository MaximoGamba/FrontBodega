import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { toast } from "react-toastify";

const Cart = () => {
  const { carrito, cambiarCantidad, quitarItem, vaciarCarrito } = useCart();
  const navigate = useNavigate();

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "2px solid var(--primary)", paddingBottom: "16px", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "4px" }}>Tu carrito</h1>
          <p style={{ color: "var(--gray)", fontSize: "13px" }}>
            {carrito.reduce((a, i) => a + i.cantidad, 0)} producto(s)
          </p>
        </div>
        <button
          onClick={() => {
            toast(
              ({ closeToast }) => (
                <div>
                  <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Vaciar el carrito?</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => { vaciarCarrito(); closeToast(); }} style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Vaciar</button>
                    <button onClick={closeToast} style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Cancelar</button>
                  </div>
                </div>
              ),
              { autoClose: false, closeButton: false, toastId: "vaciar-carrito" }
            );
          }}
          style={{ background: "none", border: "1px solid #e0b0b0", color: "#c0392b", padding: "7px 16px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Vaciar carrito
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "start" }}>
        {/* Lista de productos */}
        <div>
          {carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onCambiarCantidad={cambiarCantidad}
              onEliminar={quitarItem}
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
            onClick={() => navigate("/checkout")}
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

          <p style={{ marginTop: "24px", fontSize: "12px", color: "var(--gray)", textAlign: "center", lineHeight: "1.6", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
            ¿Tenés alguna consulta?{" "}
            <Link to="/contacto" style={{ color: "var(--primary)", textDecoration: "none" }}>
              Contactanos
            </Link>
            , con gusto te ayudamos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
