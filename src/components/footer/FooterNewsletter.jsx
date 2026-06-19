import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowRight } from "react-icons/lu";
import { validarEmail } from "../../utils/validators";
import { suscribirNewsletter } from "@/redux/usersSlice";

const FooterNewsletter = () => {
  const dispatch = useDispatch();
  const yaSuscripto = useSelector((state) => state.users.newsletterSuscripto);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (!exito) return;
    const id = setTimeout(() => setExito(false), 3000);
    return () => clearTimeout(id);
  }, [exito]);

  const handleSuscribir = () => {
    setError(""); setExito(false);
    if (!email.trim()) { setError("Ingresá tu email."); return; }
    if (!validarEmail(email)) { setError("El email no es válido."); return; }
    dispatch(suscribirNewsletter());
    setExito(true);
    setEmail("");
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
        <button onClick={handleSuscribir} disabled={yaSuscripto} style={{ background: "transparent", border: "none", padding: "0 16px", cursor: yaSuscripto ? "default" : "pointer", color: "var(--neutral)", opacity: yaSuscripto ? 0.5 : 1 }}>
          <LuArrowRight size={18} />
        </button>
      </div>
      {error && <p style={{ fontSize: "12px", color: "red", marginBottom: "8px" }}>{error}</p>}
      {exito && <p style={{ fontSize: "12px", color: "green", marginBottom: "8px" }}>Suscripción exitosa, gracias!</p>}
      {yaSuscripto && !exito && <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "8px" }}>Ya estás suscripto al newsletter.</p>}
    </div>
  );
};

export default FooterNewsletter;
