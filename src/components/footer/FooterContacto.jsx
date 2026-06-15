import { INFO_CONTACTO } from "../../data/contacto";

const FooterContacto = () => (
  <div>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
      Contactános
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {INFO_CONTACTO.map(({ label, valor }) => (
        <p key={label} style={{ fontSize: "14px", color: "var(--gray)" }}>{valor}</p>
      ))}
    </div>
  </div>
);

export default FooterContacto;
