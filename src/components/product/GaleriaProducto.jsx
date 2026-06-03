const GaleriaProducto = ({ imagenMostrada, todasImagenes, onSeleccionar, discountPercent, stock, nombre }) => (
  <div>
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

    {todasImagenes.length > 1 && (
      <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
        {todasImagenes.map((url) => (
          <img
            key={url}
            src={url}
            alt=""
            onClick={() => onSeleccionar(url)}
            style={{ width: "60px", height: "60px", objectFit: "cover", cursor: "pointer", border: imagenMostrada === url ? "2px solid var(--primary)" : "2px solid transparent", opacity: imagenMostrada === url ? 1 : 0.65 }}
          />
        ))}
      </div>
    )}
  </div>
);

export default GaleriaProducto;
