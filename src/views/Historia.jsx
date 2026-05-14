import { useEffect, useRef } from "react";

const Historia = () => {
  const playerRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player(divRef.current, {
        videoId: "bo1vdwObdS8",
        playerVars: { autoplay: 1, mute: 1, controls: 0, rel: 0, modestbranding: 1, showinfo: 0, fs: 0, iv_load_policy: 3, disablekb: 1, playsinline: 1, start: 13 },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              playerRef.current.seekTo(5);
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => { playerRef.current?.destroy(); };
  }, []);

  return (
    <div>

      {/* Hero */}
      <div style={{ position: "relative", height: "600px", overflow: "hidden", background: "var(--neutral)" }}>
        <div ref={divRef} style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw", height: "56.25vw",
          minWidth: "177.78vh", minHeight: "100%",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 2 }} />
        <div style={{ position: "relative", zIndex: 3, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 40px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--secondary)", opacity: 0.85, marginBottom: "20px" }}>
            Desde 1995
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "52px", fontWeight: "400", color: "white", maxWidth: "600px", margin: "0 auto", lineHeight: "1.2" }}>
            Nuestra Historia
          </h1>
        </div>
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
