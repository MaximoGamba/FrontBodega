const DATOS = ["+54 9 1123456789", "bodega.ventas@gmail.com"];

const FooterContacto = () => (
  <div>
    <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
      Contactános
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {DATOS.map((dato) => (
        <p key={dato} style={{ fontSize: "14px", color: "var(--gray)" }}>{dato}</p>
      ))}
    </div>
  </div>
);

export default FooterContacto;
