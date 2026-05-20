import { Link } from "react-router-dom";
import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleSuscribir = () => {
    setError("");
    setExito(false);
    if (!email.trim()) {
      setError("Ingresá tu email.");
      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      setError("El email no es válido.");
      return;
    }
    setExito(true);
    setEmail("");
    setTimeout(() => setExito(false), 3000);
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "auto" }}>

      {/* Cuerpo del footer */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px" }}>

        {/* Newsletter */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
            Suscribite a nuestro newsletter
          </p>
          <div style={{ display: "flex", border: `1px solid ${error ? "red" : "var(--border)"}`, marginBottom: "8px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); setExito(false); }}
              style={{ flex: 1, border: "none", background: "transparent", padding: "12px 16px", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", color: "var(--neutral)" }}
            />
            <button onClick={handleSuscribir} style={{ background: "transparent", border: "none", padding: "0 16px", cursor: "pointer", color: "var(--neutral)" }}>
              <LuArrowRight size={18} />
            </button>
          </div>
          {error && <p style={{ fontSize: "12px", color: "red", marginBottom: "8px" }}>{error}</p>}
          {exito && <p style={{ fontSize: "12px", color: "green", marginBottom: "8px" }}>Suscripción exitosa, gracias!</p>}
        </div>

        {/* Categorías */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
            Categorías
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Inicio", to: "/" },
              { label: "Productos", to: "/productos" },
              { label: "Ofertas", to: "/ofertas" },
              { label: "Nuestra Historia", to: "/historia" },
              { label: "Contacto", to: "/contacto" },
            ].map(({ label, to }) => (
              <Link key={to} to={to} style={{ fontSize: "14px", color: "var(--gray)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
            Contactános
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              "+54 9 1123456789",
              "bodega.ventas@gmail.com",
            ].map((dato) => (
              <p key={dato} style={{ fontSize: "14px", color: "var(--gray)" }}>{dato}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "20px 40px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "var(--gray)" }}>
          Copyright ApiBodega – 2026. Todos los derechos reservados.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
