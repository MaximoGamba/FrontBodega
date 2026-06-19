const ImagenProducto = ({ imagenMostrada, discountPercent, stock, nombre }) => (
  <div style={{ position: "relative" }}>
    <img
      src={imagenMostrada}
      alt={nombre}
      style={{ width: "100%", maxHeight: "560px", objectFit: "contain", background: "#ffffff", padding: "24px" }}
    />
    {discountPercent > 0 && (
      <span style={{ position: "absolute", top: "16px", left: "16px", background: "var(--primary)", color: "white", fontSize: "12px", padding: "6px 12px", letterSpacing: "1px" }}>
        -{discountPercent}%
      </span>
    )}
    {stock === 0 && (
      <span style={{ position: "absolute", top: "16px", right: "16px", background: "var(--primary-dark)", color: "white", fontSize: "12px", padding: "6px 12px", letterSpacing: "1px" }}>
        Sin stock
      </span>
    )}
  </div>
);

export default ImagenProducto;
