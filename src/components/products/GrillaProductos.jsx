import ProductCard from "../product/ProductCard";

const GrillaProductos = ({ productos, cargando, error }) => {
  if (cargando) return (
    <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
      Cargando productos...
    </p>
  );

  if (error) return (
    <p style={{ textAlign: "center", color: "var(--primary)", marginTop: "60px", fontSize: "16px" }}>
      {error}
    </p>
  );

  if (productos.length === 0) return (
    <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
      No hay vinos que coincidan con los filtros seleccionados.
    </p>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default GrillaProductos;
