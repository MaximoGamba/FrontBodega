import ProductCard from "./ProductCard";

const ProductosSimilares = ({ similares }) => {
  if (similares.length === 0) return null;

  return (
    <div style={{ marginTop: "64px", borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "32px" }}>
        Productos similares
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
        {similares.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductosSimilares;
