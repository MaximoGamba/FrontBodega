/** URLs de imágenes — reemplazá por las tuyas */
const HISTORIA_HERO_BG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80";
const IMG_ORIGENES =
  "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80";
const IMG_SELECCION =
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80";
const IMG_HOY =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80";

const bloqueImagen = (src, alt) => (
  <figure
    style={{
      margin: "0 0 56px",
      border: "1px solid var(--border)",
      overflow: "hidden",
      background: "var(--border)",
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "min(380px, 55vw)",
        objectFit: "cover",
        display: "block",
      }}
    />
  </figure>
);

const Historia = () => {
  return (
    <div>

      {/* Hero */}
      <div
        style={{
          padding: "100px 40px",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--neutral)",
          backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.55)), url(${HISTORIA_HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", opacity: 0.95, marginBottom: "20px" }}>
          Desde 1995
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "52px", fontWeight: "400", color: "var(--white)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.2" }}>
          Nuestra Historia
        </h1>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 40px" }}>

        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "16px" }}>
            Los orígenes
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "20px", fontWeight: "400" }}>
            Una pasión que nació en Mendoza
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gray)", lineHeight: "1.9" }}>
            En 1995, en el corazón de la región vitivinícola más importante de Argentina, nació ApiBodega con una misión clara: acercar los mejores vinos de Cuyo a todo el país. Lo que comenzó como un pequeño emprendimiento familiar se convirtió con los años en una referencia del comercio vitivinícola argentino.
          </p>
        </div>

        {bloqueImagen(IMG_ORIGENES, "Viñedos al pie de la cordillera")}

        <div style={{ width: "48px", height: "2px", background: "var(--primary)", marginBottom: "56px" }} />

        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "16px" }}>
            Nuestra selección
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "20px", fontWeight: "400" }}>
            Solo lo mejor de cada cosecha
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gray)", lineHeight: "1.9" }}>
            Trabajamos directamente con bodegas de Mendoza, San Juan y La Rioja, visitando viñedos y participando en cada cosecha. Nuestro equipo selecciona personalmente los vinos que forman parte del catálogo, garantizando calidad en cada botella.
          </p>
        </div>

        {bloqueImagen(IMG_SELECCION, "Selección de vinos en botellas")}

        <div style={{ width: "48px", height: "2px", background: "var(--primary)", marginBottom: "56px" }} />

        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "16px" }}>
            Hoy
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "20px", fontWeight: "400" }}>
            Más de 30 años y seguimos creciendo
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gray)", lineHeight: "1.9" }}>
            Hoy contamos con cientos de clientes en todo el país y un catálogo de más de 50 vinos cuidadosamente seleccionados. Cada año incorporamos nuevas bodegas y varietales, siempre con el compromiso de ofrecerte la mejor experiencia vinícola desde la comodidad de tu hogar.
          </p>
        </div>

        {bloqueImagen(IMG_HOY, "Interior de bodega con barricas")}

        {/* Números */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", borderTop: "1px solid var(--border)", paddingTop: "56px", textAlign: "center" }}>
          {[
            { numero: "30+", texto: "Años de experiencia" },
            { numero: "50+", texto: "Vinos en catálogo" },
            { numero: "10+", texto: "Bodegas asociadas" },
          ].map(({ numero, texto }) => (
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
};

export default Historia;
