import { productosIniciales, colores, cepas } from "../data/productos";
import ProductCard from "../components/ProductCard";

const enOferta = productosIniciales.filter((p) => p.discountPercent > 0 && p.activo);

const Sale = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ marginBottom: "32px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>Sale</h1>
        <p style={{ fontSize: "13px", color: "var(--gray)" }}>
          {enOferta.length} productos con descuento
        </p>
      </div>

      {enOferta.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
          No hay productos en oferta por el momento.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {enOferta.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              colores={colores}
              cepas={cepas}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sale;
