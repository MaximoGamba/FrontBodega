import { Link } from "react-router-dom";

const PasoConfirmacion = ({ nombre, email, pedidoId }) => (
  <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto", padding: "40px 0" }}>
    <div style={{ fontSize: "48px", marginBottom: "24px" }}>✓</div>
    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "16px" }}>
      ¡Pedido confirmado!
    </h2>
    {pedidoId && (
      <p style={{ fontSize: "13px", color: "var(--gray)", letterSpacing: "1px", marginBottom: "8px" }}>
        Pedido <strong>#{pedidoId}</strong>
      </p>
    )}
    <p style={{ color: "var(--gray)", marginBottom: "8px" }}>
      Gracias, {nombre || "cliente"}. Tu pedido fue recibido con éxito.
    </p>
    <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px" }}>
      Te enviaremos un email a {email || "tu casilla"} con los detalles.
    </p>
    <Link
      to="/productos"
      style={{ background: "var(--primary)", color: "white", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none" }}
    >
      Seguir comprando
    </Link>
  </div>
);

export default PasoConfirmacion;
