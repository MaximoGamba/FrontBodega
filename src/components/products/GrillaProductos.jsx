import ProductCard from "../product/ProductCard";
import EstadoCarga from "../shared/EstadoCarga";

const GrillaProductos = ({ productos, cargando, error }) => (
  <EstadoCarga cargando={cargando} error={error}>
    {productos.length === 0 ? (
      <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
        No hay vinos que coincidan con los filtros seleccionados.
      </p>
    ) : (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    )}
  </EstadoCarga>
);

export default GrillaProductos;
