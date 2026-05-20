import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchVinos } from "../services/api";
import ProductCard from "../components/ProductCard";
import { LuTruck, LuCreditCard, LuMessageCircle } from "react-icons/lu";

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetchVinos()
      .then((data) => setDestacados(data.filter((p) => p.discountPercent > 0).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div>

      {/* Hero */}
      <section style={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1464638681273-0962e9b53566?q=80&w=2940&auto=format&fit=crop"
          alt="Viñedo"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center bottom" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 40px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "20px", opacity: 0.85 }}>
            Bienvenido a ApiBodega
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "56px", fontWeight: "400", maxWidth: "700px", lineHeight: "1.2", marginBottom: "24px", color: "white" }}>
            Vinos seleccionados para cada ocasión
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", maxWidth: "480px", lineHeight: "1.7", marginBottom: "40px" }}>
            Explorá nuestra colección de vinos cuidadosamente seleccionados de las mejores bodegas argentinas.
          </p>
          <Link
            to="/productos"
            style={{ background: "var(--primary)", color: "white", padding: "16px 40px", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none" }}
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Destacados */}
      {destacados.length > 0 && (
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
      )}

      {/* Banner historia */}
      <section style={{ background: "var(--neutral)", padding: "80px 40px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "20px", opacity: 0.7 }}>
          Desde 1995
        </p>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", fontWeight: "400", color: "var(--secondary)", maxWidth: "600px", margin: "0 auto 24px", lineHeight: "1.3" }}>
          Tradición y pasión en cada botella
        </h2>
        <p style={{ fontSize: "15px", color: "var(--secondary)", opacity: 0.7, maxWidth: "480px", margin: "0 auto 40px", lineHeight: "1.7" }}>
          Más de 30 años seleccionando los mejores vinos de Mendoza, San Juan y La Rioja para llevarte lo mejor de la vitivinicultura argentina.
        </p>
        <Link
          to="/historia"
          style={{ background: "transparent", color: "var(--secondary)", padding: "14px 36px", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", border: "1px solid var(--secondary)" }}
        >
          Conocé nuestra historia
        </Link>
      </section>

      {/* Servicios */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px", textAlign: "center" }}>
          {[
            { icono: <LuTruck size={40} strokeWidth={1} />, titulo: "Métodos de envío", texto: "Hacemos envíos a todo el país" },
            { icono: <LuCreditCard size={40} strokeWidth={1} />, titulo: "Métodos de pago", texto: "3 cuotas sin interés" },
            { icono: <LuMessageCircle size={40} strokeWidth={1} />, titulo: "Escribínos", texto: "Atención personalizada por Whatsapp" },
          ].map(({ icono, titulo, texto }) => (
            <div key={titulo}>
              <div style={{ color: "var(--gray)", marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                {icono}
              </div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--neutral)", marginBottom: "8px" }}>
                {titulo}
              </p>
              <p style={{ fontSize: "14px", color: "var(--gray)", lineHeight: "1.6" }}>
                {texto}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
