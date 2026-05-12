import { Link } from "react-router-dom";
import { productosIniciales, colores, cepas } from "../data/productos";
import ProductCard from "../components/ProductCard";
import { LuTruck, LuCreditCard, LuMessageCircle } from "react-icons/lu";

/** Imagen de fondo del hero (cualquier URL pública: Unsplash, tu CDN, etc.) */
const HERO_FONDO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ampYtcoDLkOUDo3CxdWHZLlIg0DxKeabkqYFWQlBDsOh1Jqghwq21W8xmrCDbBYznbZhEx8ZboYYuad2bnvy5V66tLEIJzd1w3XvA6dFn-hGGkUyfa1rV1OLKfXW_HUxfynVxVXcpQBPfefeSn3LGSQc5u9iCT7kh_NX7UKE3BQWlgHNa3XYhfsH3jFB-tnsFMT3_rL9e7fXXmIBtl1stDhQ2atrrGLFYTyqVOk8C9VXDm9kHRW6aqrqG3KhDl6Wu5SPr7w_rxE";

const destacados = productosIniciales.filter((p) => p.discountPercent > 0).slice(0, 3);

const Home = () => {
  return (
    <div>

      {/* Hero — fondo por URL: capa oscura encima para que el texto se lea bien */}
      <section
        style={{
          padding: "100px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--neutral)",
          backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.65), rgba(26, 26, 26, 0.5)), url(${HERO_FONDO_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "20px", opacity: 0.95 }}>
          Bienvenido a ApiBodega
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "56px", fontWeight: "400", maxWidth: "700px", lineHeight: "1.2", marginBottom: "24px", color: "var(--white)" }}>
          Vinos seleccionados para cada ocasión
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", maxWidth: "480px", lineHeight: "1.7", marginBottom: "40px" }}>
          Explorá nuestra colección de vinos cuidadosamente seleccionados de las mejores bodegas argentinas.
        </p>
        <Link
          to="/productos"
          style={{ background: "var(--primary)", color: "white", padding: "16px 40px", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none" }}
        >
          Ver catálogo
        </Link>
      </section>

      {/* Destacados */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "40px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px" }}>Ofertas destacadas</h2>
          <Link to="/sale" style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--primary)", textDecoration: "none" }}>
            Ver todas →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {destacados.map((producto) => ( //map es un metodo que se usa para recorrer un array y devolver un nuevo array con los valores de la funcion
            <ProductCard
              key={producto.id} //key es un atributo que se usa para identificar un elemento en el array
              producto={producto}
              colores={colores}
              cepas={cepas}
            />
          ))}
        </div>
      </section>

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
