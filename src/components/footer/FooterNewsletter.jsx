import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleSuscribir = () => {
    setError(""); setExito(false);
    if (!email.trim()) { setError("Ingresá tu email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("El email no es válido."); return; }
    setExito(true);
    setEmail("");
    setTimeout(() => setExito(false), 3000);
  };

  return (
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
  );
};

export default FooterNewsletter;
