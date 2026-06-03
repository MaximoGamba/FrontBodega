const ResumenPedido = ({ carrito, subtotal }) => (
  <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
    <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", marginBottom: "20px" }}>
      Tu pedido
    </p>
    {carrito.map((item) => {
      const precioFinal = item.discountPercent > 0
        ? item.price * (1 - item.discountPercent / 100)
        : item.price;
      return (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray)", marginBottom: "10px" }}>
          <span>{item.name} × {item.cantidad}</span>
          <span>${(precioFinal * item.cantidad).toLocaleString()}</span>
        </div>
      );
    })}
    <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontWeight: "600" }}>
      <span>Total</span>
      <span>${subtotal.toLocaleString()}</span>
    </div>
  </div>
);

export default ResumenPedido;
