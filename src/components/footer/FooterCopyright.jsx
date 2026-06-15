const FooterCopyright = () => (
  <div style={{ borderTop: "1px solid var(--border)", padding: "20px 40px", textAlign: "center" }}>
    <p style={{ fontSize: "12px", color: "var(--gray)" }}>
      Copyright ApiBodega – {new Date().getFullYear()}. Todos los derechos reservados.
    </p>
  </div>
);

export default FooterCopyright;
