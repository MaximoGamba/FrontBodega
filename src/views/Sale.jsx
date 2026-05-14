import { useState, useEffect } from "react";
import { fetchVinos } from "../services/api";
import ProductCard from "../components/ProductCard";

const Sale = () => {
  const [enOferta, setEnOferta] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [orden, setOrden] = useState("");

  const ordenar = (lista) => {
    const c = [...lista];
    if (orden === "precio-asc") return c.sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") return c.sort((a, b) => b.price - a.price);
    if (orden === "nuevo") return c.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (orden === "antiguo") return c.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    return c;
  };

  useEffect(() => {
    fetchVinos()
      .then((data) => {
        setEnOferta(data.filter((p) => p.discountPercent > 0));
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>Ofertas</h1>
          <p style={{ fontSize: "13px", color: "var(--gray)" }}>
            {cargando ? "Cargando..." : `${enOferta.length} productos con descuento`}
          </p>
        </div>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          style={{ border: "1px solid var(--border)", padding: "6px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", background: "white", cursor: "pointer" }}
        >
          <option value="">Ordenar por</option>
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
          <option value="nuevo">Más reciente</option>
          <option value="antiguo">Más antiguo</option>
        </select>
      </div>

      {!cargando && enOferta.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
          No hay productos en oferta por el momento.
        </p>
      )}

      {!cargando && enOferta.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {ordenar(enOferta).map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sale;
