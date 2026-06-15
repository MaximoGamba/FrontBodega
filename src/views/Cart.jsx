import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cambiarCantidad, quitarItem, vaciarCarrito } from "@/redux/carritoSlice";
import { calcularSubtotal } from "../utils/formatters";
import CartItem from "../components/cart/CartItem";
import ResumenCarrito from "../components/cart/ResumenCarrito";

const Cart = () => {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito.items);
  const subtotal = calcularSubtotal(carrito);

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

  const confirmarVaciar = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Vaciar el carrito?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => { dispatch(vaciarCarrito()); closeToast(); }} style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Vaciar</button>
            <button onClick={closeToast} style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Cancelar</button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false, toastId: "vaciar-carrito" }
    );
  };

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
          onClick={confirmarVaciar}
          style={{ background: "none", border: "1px solid #e0b0b0", color: "#c0392b", padding: "7px 16px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Vaciar carrito
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "48px", alignItems: "start" }}>
        <div>
          {carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onCambiarCantidad={(id, delta) => dispatch(cambiarCantidad({ id, delta }))}
              onEliminar={(id) => dispatch(quitarItem(id))}
            />
          ))}
        </div>
        <ResumenCarrito carrito={carrito} subtotal={subtotal} />
      </div>
    </div>
  );
};

export default Cart;
