import { Link } from "react-router-dom";

const HeroSection = () => (
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
);

export default HeroSection;
