import { HISTORIA_FUNDACION, SECCIONES_HISTORIA, NUMEROS_HISTORIA } from "../data/historia";

const Historia = () => (
  <div>
    {/* Hero */}
    <div style={{ position: "relative", height: "600px", background: "#000" }}>
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 40px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", opacity: 0.85, marginBottom: "20px" }}>
          Desde {HISTORIA_FUNDACION}
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "52px", fontWeight: "400", color: "white", maxWidth: "600px", margin: "0 auto", lineHeight: "1.2" }}>
          Nuestra Historia
        </h1>
      </div>
    </div>

    {/* Contenido */}
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px" }}>
      {SECCIONES_HISTORIA.map((seccion, i) => (
        <div key={seccion.etiqueta}>
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "16px" }}>
              {seccion.etiqueta}
            </p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "20px", fontWeight: "400" }}>
              {seccion.titulo}
            </h2>
            <p style={{ fontSize: "15px", color: "var(--gray)", lineHeight: "1.9" }}>
              {seccion.texto}
            </p>
          </div>
          {i < SECCIONES_HISTORIA.length - 1 && (
            <div style={{ width: "48px", height: "2px", background: "var(--primary)", marginBottom: "56px" }} />
          )}
        </div>
      ))}

      {/* Números */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", borderTop: "1px solid var(--border)", paddingTop: "56px", textAlign: "center" }}>
        {NUMEROS_HISTORIA.map(({ numero, texto }) => (
          <div key={texto}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "40px", color: "var(--primary)", marginBottom: "8px" }}>
              {numero}
            </p>
            <p style={{ fontSize: "13px", color: "var(--gray)", letterSpacing: "0.5px" }}>
              {texto}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Historia;
