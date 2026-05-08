import { useState } from "react";

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  padding: "12px 14px",
  fontSize: "14px",
  fontFamily: "var(--font-sans)",
  outline: "none",
  boxSizing: "border-box",
  background: "transparent",
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--gray)",
  display: "block",
  marginBottom: "6px",
};

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setError("Completá todos los campos.");
      return;
    }
    setError("");
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ marginBottom: "48px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>Contacto</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

        {/* Formulario */}
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", marginBottom: "24px" }}>
            Envianos un mensaje
          </h2>

          {enviado ? (
            <div style={{ padding: "24px", border: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", marginBottom: "8px" }}>
                ¡Mensaje enviado!
              </p>
              <p style={{ fontSize: "14px", color: "var(--gray)", marginBottom: "20px" }}>
                Te respondemos a la brevedad.
              </p>
              <button
                onClick={() => setEnviado(false)}
                style={{ background: "none", border: "none", fontSize: "13px", color: "var(--primary)", cursor: "pointer", textDecoration: "underline" }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input
                  style={inputStyle}
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Mensaje</label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                />
              </div>
              {error && (
                <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0" }}>{error}</p>
              )}
              <button
                type="submit"
                style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>

        {/* Info de contacto */}
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", marginBottom: "24px" }}>
            Información de contacto
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
    </div>
  );
};

export default Contacto;
