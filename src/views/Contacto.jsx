const Contacto = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ marginBottom: "48px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>Contacto</h1>
      </div>

      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", marginBottom: "24px" }}>
          Información de contacto
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {[
            { label: "Teléfono / WhatsApp", valor: "+54 9 1123456789" },
            { label: "Email", valor: "bodega.ventas@gmail.com" },
            { label: "Horario de atención", valor: "Lunes a viernes de 9 a 18hs" },
          ].map(({ label, valor }) => (
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
};

export default Contacto;
