import { Link } from "react-router-dom";
import { HISTORIA_FUNDACION } from "../../data/historia";

const HistoriaBanner = () => (
  <section style={{ background: "var(--neutral)", padding: "80px 40px", textAlign: "center" }}>
    <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", marginBottom: "20px", opacity: 0.7 }}>
      Desde {HISTORIA_FUNDACION}
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
);

export default HistoriaBanner;
