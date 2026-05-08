import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const pasos = ["Envío", "Pago", "Confirmación"];

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  padding: "10px 14px",
  fontSize: "14px",
  fontFamily: "var(--font-sans)",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "12px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "var(--gray)",
  display: "block",
  marginBottom: "6px",
};

const Checkout = () => {
  const { carrito, setCarrito } = useCart();
  const [paso, setPaso] = useState(0);

  const [envio, setEnvio] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  });

  const [pago, setPago] = useState({
    metodo: "tarjeta",
    nombreTarjeta: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const subtotal = carrito.reduce((acc, item) => {
    const precioFinal =
      item.discountPercent > 0
        ? item.price * (1 - item.discountPercent / 100)
        : item.price;
    return acc + precioFinal * item.cantidad;
  }, 0);

  const [errorEnvio, setErrorEnvio] = useState("");
  const [errorPago, setErrorPago] = useState("");

  const avanzarEnvio = () => {
    const { nombre, apellido, email, telefono, direccion, ciudad, provincia, codigoPostal } = envio;
    if (!nombre || !apellido || !email || !telefono || !direccion || !ciudad || !provincia || !codigoPostal) {
      setErrorEnvio("Completá todos los campos antes de continuar.");
      return;
    }
    setErrorEnvio("");
    setPaso(1);
  };

  const confirmar = () => {
    if (pago.metodo === "tarjeta") {
      const { nombreTarjeta, numeroTarjeta, vencimiento, cvv } = pago;
      if (!nombreTarjeta || !numeroTarjeta || !vencimiento || !cvv) {
        setErrorPago("Completá los datos de la tarjeta antes de confirmar.");
        return;
      }
    }
    setErrorPago("");
    setCarrito([]);
    setPaso(2);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Indicador de pasos */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
        {pasos.map((nombre, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: i <= paso ? "var(--primary)" : "var(--border)",
                color: i <= paso ? "white" : "var(--gray)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: "600",
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: i <= paso ? "var(--primary)" : "var(--gray)" }}>
                {nombre}
              </span>
            </div>
            {i < pasos.length - 1 && (
              <div style={{ width: "80px", height: "1px", background: "var(--border)", margin: "0 12px", marginBottom: "20px" }} />
            )}
          </div>
        ))}
      </div>

      {/* Paso 1: Envío */}
      {paso === 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "28px" }}>
              Datos de envío
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Nombre</label>
                <input style={inputStyle} value={envio.nombre} onChange={e => setEnvio({ ...envio, nombre: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Apellido</label>
                <input style={inputStyle} value={envio.apellido} onChange={e => setEnvio({ ...envio, apellido: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={envio.email} onChange={e => setEnvio({ ...envio, email: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input style={inputStyle} value={envio.telefono} onChange={e => setEnvio({ ...envio, telefono: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Dirección</label>
                <input style={inputStyle} value={envio.direccion} onChange={e => setEnvio({ ...envio, direccion: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Ciudad</label>
                <input style={inputStyle} value={envio.ciudad} onChange={e => setEnvio({ ...envio, ciudad: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Provincia</label>
                <input style={inputStyle} value={envio.provincia} onChange={e => setEnvio({ ...envio, provincia: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Código Postal</label>
                <input style={inputStyle} value={envio.codigoPostal} onChange={e => setEnvio({ ...envio, codigoPostal: e.target.value })} />
              </div>
            </div>
            {errorEnvio && (
              <p style={{ fontSize: "13px", color: "var(--primary)", marginTop: "16px" }}>{errorEnvio}</p>
            )}
            <button
              onClick={avanzarEnvio}
              style={{ marginTop: "16px", background: "var(--primary)", color: "white", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
            >
              Continuar
            </button>
          </div>
          <Resumen carrito={carrito} subtotal={subtotal} />
        </div>
      )}

      {/* Paso 2: Pago */}
      {paso === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "28px" }}>
              Método de pago
            </h2>

            <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
              {["tarjeta", "transferencia"].map((m) => (
                <label
                  key={m}
                  style={{ display: "flex", alignItems: "center", gap: "8px", border: `1px solid ${pago.metodo === m ? "var(--primary)" : "var(--border)"}`, padding: "12px 20px", cursor: "pointer", fontSize: "14px" }}
                >
                  <input
                    type="radio"
                    name="metodo"
                    value={m}
                    checked={pago.metodo === m}
                    onChange={() => setPago({ ...pago, metodo: m })}
                    style={{ accentColor: "var(--primary)" }}
                  />
                  {m === "tarjeta" ? "Tarjeta" : "Transferencia"}
                </label>
              ))}
            </div>

            {pago.metodo === "tarjeta" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Nombre en la tarjeta</label>
                  <input style={inputStyle} value={pago.nombreTarjeta} onChange={e => setPago({ ...pago, nombreTarjeta: e.target.value })} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Número de tarjeta</label>
                  <input style={inputStyle} maxLength={19} value={pago.numeroTarjeta} onChange={e => setPago({ ...pago, numeroTarjeta: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Vencimiento</label>
                  <input style={inputStyle} placeholder="MM/AA" maxLength={5} value={pago.vencimiento} onChange={e => setPago({ ...pago, vencimiento: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input style={inputStyle} maxLength={4} value={pago.cvv} onChange={e => setPago({ ...pago, cvv: e.target.value })} />
                </div>
              </div>
            )}

            {pago.metodo === "transferencia" && (
              <div style={{ background: "var(--secondary)", padding: "20px", fontSize: "14px", lineHeight: "1.8" }}>
                <p style={{ fontWeight: "600", marginBottom: "8px" }}>Datos para transferencia:</p>
                <p>CBU: 0000003100012345678901</p>
                <p>Alias: BODEGA.VINOS</p>
                <p>Titular: Bodega S.A.</p>
                <p style={{ marginTop: "12px", color: "var(--gray)", fontSize: "12px" }}>
                  Una vez realizada la transferencia, tu pedido será confirmado en 24hs hábiles.
                </p>
              </div>
            )}

            {errorPago && (
              <p style={{ fontSize: "13px", color: "var(--primary)", marginTop: "16px" }}>{errorPago}</p>
            )}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button
                onClick={() => setPaso(0)}
                style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "14px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
              >
                Volver
              </button>
              <button
                onClick={confirmar}
                style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
              >
                Confirmar pedido
              </button>
            </div>
          </div>
          <Resumen carrito={carrito} subtotal={subtotal} />
        </div>
      )}

      {/* Paso 3: Confirmación */}
      {paso === 2 && (
        <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto", padding: "40px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", marginBottom: "16px" }}>
            ¡Pedido confirmado!
          </h2>
          <p style={{ color: "var(--gray)", marginBottom: "8px" }}>
            Gracias, {envio.nombre || "cliente"}. Tu pedido fue recibido con éxito.
          </p>
          <p style={{ color: "var(--gray)", fontSize: "13px", marginBottom: "40px" }}>
            Te enviaremos un email a {envio.email || "tu casilla"} con los detalles.
          </p>
          <Link
            to="/productos"
            style={{ background: "var(--primary)", color: "white", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none" }}
          >
            Seguir comprando
          </Link>
        </div>
      )}
    </div>
  );
};

const Resumen = ({ carrito, subtotal }) => (
  <div style={{ border: "1px solid var(--border)", padding: "24px" }}>
    <p style={{ fontFamily: "var(--font-serif)", fontSize: "18px", marginBottom: "20px" }}>
      Tu pedido
    </p>
    {carrito.map((item) => {
      const precioFinal =
        item.discountPercent > 0
          ? item.price * (1 - item.discountPercent / 100)
          : item.price;
      return (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--gray)", marginBottom: "10px" }}>
          <span>{item.name} × {item.cantidad}</span>
          <span>${(precioFinal * item.cantidad).toLocaleString()}</span>
        </div>
      );
    })}
    <div style={{ borderTop: "1px solid var(--border)", marginTop: "16px", paddingTop: "16px", display: "flex", justifyContent: "space-between", fontWeight: "600" }}>
      <span>Total</span>
      <span>${subtotal.toLocaleString()}</span>
    </div>
  </div>
);

export default Checkout;
