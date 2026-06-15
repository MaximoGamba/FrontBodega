const btnCantidad = {
  width: "36px", height: "36px", border: "1px solid var(--border)",
  background: "white", cursor: "pointer", fontSize: "18px",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const AccionesProducto = ({ producto, cantidad, onCantidad, onAgregar, esAdmin }) => {
  if (esAdmin) return null;

  if (producto.stock === 0) {
    return (
      <button
        disabled
        style={{ width: "100%", background: "var(--primary-dark)", color: "white", border: "none", padding: "16px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "not-allowed", opacity: 0.7 }}
      >
        Sin stock
      </button>
    );
  }

  return (
    <div>
      <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "10px" }}>
        Cantidad
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <button onClick={() => onCantidad(Math.max(1, cantidad - 1))} style={btnCantidad}>−</button>
        <span style={{ fontSize: "16px", minWidth: "24px", textAlign: "center" }}>{cantidad}</span>
        <button onClick={() => onCantidad(Math.min(producto.stock, cantidad + 1))} style={btnCantidad}>+</button>
      </div>
      <button
        onClick={onAgregar}
        style={{ width: "100%", background: "var(--primary)", color: "white", border: "none", padding: "16px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default AccionesProducto;
