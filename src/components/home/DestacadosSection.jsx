import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";

const DestacadosSection = ({ destacados }) => {
  if (destacados.length === 0) return null;

  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px" }}>Ofertas destacadas</h2>
        <Link to="/ofertas" style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--primary)", textDecoration: "none" }}>
          Ver todas →
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
        {destacados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
};

export default DestacadosSection;
