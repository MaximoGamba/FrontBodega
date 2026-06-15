import { INFO_CONTACTO } from "../data/contacto";

const Contacto = () => (
  <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
    <div style={{ marginBottom: "48px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>Contacto</h1>
    </div>

    <div>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", marginBottom: "24px" }}>
        Información de contacto
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
        {INFO_CONTACTO.map(({ label, valor }) => (
          <div key={label}>
            <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "6px" }}>
              {label}
            </p>
            <p style={{ fontSize: "15px" }}>{valor}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Contacto;
