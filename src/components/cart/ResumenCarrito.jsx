import { Link, useNavigate } from "react-router-dom";

const ResumenCarrito = ({ carrito, subtotal }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid var(--border)", padding: "28px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
        Resumen del pedido
      </p>

      {carrito.map((item) => {
        const precioFinal = item.discountPercent > 0
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
        <Link to="/contacto" style={{ color: "var(--primary)", textDecoration: "none" }}>Contactanos</Link>
        , con gusto te ayudamos.
      </p>
    </div>
  );
};

export default ResumenCarrito;
