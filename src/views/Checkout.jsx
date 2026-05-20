import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { crearPedido, crearEnvio, crearPago, actualizarEstadoPedido } from "../services/api";

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

// ── Helpers de formato ────────────────────────────────────────────────────────

const soloLetras = (val) => val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, "");

const soloNumerosYSignos = (val) => val.replace(/[^0-9+\-\s]/g, "");

const soloNumeros = (val) => val.replace(/\D/g, "");

const formatearTarjeta = (val) => {
  const digits = val.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatearVencimiento = (val, prev) => {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  // Si borra el '/', eliminar también el último dígito del mes
  if (prev.endsWith("/") && val.length < prev.length) return digits.slice(0, 1);
  return digits;
};

// ── Validaciones ──────────────────────────────────────────────────────────────

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const validarVencimiento = (val) => {
  if (!/^\d{2}\/\d{2}$/.test(val)) return false;
  const mes = parseInt(val.slice(0, 2), 10);
  const anio = parseInt("20" + val.slice(3), 10);
  if (mes < 1 || mes > 12) return false;
  const ahora = new Date();
  const expiry = new Date(anio, mes - 1, 1);
  return expiry >= new Date(ahora.getFullYear(), ahora.getMonth(), 1);
};

// ─────────────────────────────────────────────────────────────────────────────

const Checkout = () => {
  const { carrito, vaciarCarrito } = useCart();
  const [paso, setPaso] = useState(0);

  const [envio, setEnvio] = useState({
    nombre: "", apellido: "", email: "", telefono: "",
    direccion: "", ciudad: "", provincia: "", codigoPostal: "",
  });

  const [pago, setPago] = useState({
    metodo: "tarjeta", nombreTarjeta: "", numeroTarjeta: "", vencimiento: "", cvv: "",
  });

  const subtotal = carrito.reduce((acc, item) => {
    const precioFinal = item.discountPercent > 0
      ? item.price * (1 - item.discountPercent / 100)
      : item.price;
    return acc + precioFinal * item.cantidad;
  }, 0);

  const [errorEnvio, setErrorEnvio] = useState("");
  const [errorPago, setErrorPago] = useState("");
  const [enviando, setEnviando] = useState(false);

  // ── Handlers envío ──────────────────────────────────────────────────────────

  const setE = (campo, valor) => setEnvio((prev) => ({ ...prev, [campo]: valor }));

  const avanzarEnvio = () => {
    const { nombre, apellido, email, telefono, direccion, ciudad, provincia, codigoPostal } = envio;
    if (!nombre || !apellido || !email || !telefono || !direccion || !ciudad || !provincia || !codigoPostal) {
      setErrorEnvio("Completá todos los campos antes de continuar.");
      return;
    }
    if (!validarEmail(email)) {
      setErrorEnvio("El email no tiene un formato válido.");
      return;
    }
    if (soloNumeros(telefono).length < 6) {
      setErrorEnvio("El teléfono debe tener al menos 6 dígitos.");
      return;
    }
    const cp = soloNumeros(codigoPostal);
    if (cp.length < 4 || cp.length > 8) {
      setErrorEnvio("El código postal debe tener entre 4 y 8 dígitos.");
      return;
    }
    setErrorEnvio("");
    setPaso(1);
  };

  // ── Handlers pago ───────────────────────────────────────────────────────────

  const setP = (campo, valor) => setPago((prev) => ({ ...prev, [campo]: valor }));

  const confirmar = async () => {
    if (pago.metodo === "tarjeta") {
      const { nombreTarjeta, numeroTarjeta, vencimiento, cvv } = pago;
      if (!nombreTarjeta || !numeroTarjeta || !vencimiento || !cvv) {
        setErrorPago("Completá todos los datos de la tarjeta.");
        return;
      }
      if (soloNumeros(numeroTarjeta).length !== 16) {
        setErrorPago("El número de tarjeta debe tener 16 dígitos.");
        return;
      }
      if (!validarVencimiento(vencimiento)) {
        setErrorPago("El vencimiento no es válido (formato MM/AA y fecha futura).");
        return;
      }
      const cvvLen = soloNumeros(cvv).length;
      if (cvvLen < 3 || cvvLen > 4) {
        setErrorPago("El CVV debe tener 3 o 4 dígitos.");
        return;
      }
    }
    setErrorPago("");
    setEnviando(true);
    try {
      const items = carrito.map((item) => ({ wineId: item.id, quantity: item.cantidad }));
      const orden = await crearPedido(items);
      if (!orden?.id) throw new Error("No se pudo crear el pedido");
      const pedidoId = orden.id;

      await crearEnvio(pedidoId, `${envio.direccion}, ${envio.ciudad}, ${envio.provincia}`);
      await crearPago(pedidoId, subtotal, pago.metodo.toUpperCase());

      if (pago.metodo === "tarjeta") {
        await actualizarEstadoPedido(pedidoId, "PAID");
      }

      vaciarCarrito();
      setPaso(2);
    } catch (err) {
      setErrorPago(err.message || "Hubo un error al procesar tu pedido. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
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
                <input
                  style={inputStyle}
                  value={envio.nombre}
                  maxLength={50}
                  onChange={e => setE("nombre", soloLetras(e.target.value))}
                />
              </div>
              <div>
                <label style={labelStyle}>Apellido</label>
                <input
                  style={inputStyle}
                  value={envio.apellido}
                  maxLength={50}
                  onChange={e => setE("apellido", soloLetras(e.target.value))}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle}
                  type="email"
                  value={envio.email}
                  maxLength={100}
                  onChange={e => setE("email", e.target.value.trim())}
                />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input
                  style={inputStyle}
                  value={envio.telefono}
                  maxLength={15}
                  placeholder="+54 11 1234-5678"
                  onChange={e => setE("telefono", soloNumerosYSignos(e.target.value))}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Dirección</label>
                <input
                  style={inputStyle}
                  value={envio.direccion}
                  maxLength={150}
                  onChange={e => setE("direccion", e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Ciudad</label>
                <input
                  style={inputStyle}
                  value={envio.ciudad}
                  maxLength={60}
                  onChange={e => setE("ciudad", soloLetras(e.target.value))}
                />
              </div>
              <div>
                <label style={labelStyle}>Provincia</label>
                <input
                  style={inputStyle}
                  value={envio.provincia}
                  maxLength={60}
                  onChange={e => setE("provincia", soloLetras(e.target.value))}
                />
              </div>
              <div>
                <label style={labelStyle}>Código Postal</label>
                <input
                  style={inputStyle}
                  value={envio.codigoPostal}
                  maxLength={8}
                  placeholder="1234"
                  onChange={e => setE("codigoPostal", soloNumeros(e.target.value))}
                />
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
                  <input
                    style={inputStyle}
                    value={pago.nombreTarjeta}
                    maxLength={60}
                    onChange={e => setP("nombreTarjeta", soloLetras(e.target.value))}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Número de tarjeta</label>
                  <input
                    style={inputStyle}
                    value={pago.numeroTarjeta}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    inputMode="numeric"
                    onChange={e => setP("numeroTarjeta", formatearTarjeta(e.target.value))}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Vencimiento</label>
                  <input
                    style={inputStyle}
                    placeholder="MM/AA"
                    maxLength={5}
                    inputMode="numeric"
                    value={pago.vencimiento}
                    onChange={e => setP("vencimiento", formatearVencimiento(e.target.value, pago.vencimiento))}
                  />
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input
                    style={inputStyle}
                    value={pago.cvv}
                    maxLength={4}
                    inputMode="numeric"
                    placeholder="123"
                    onChange={e => setP("cvv", soloNumeros(e.target.value))}
                  />
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
                disabled={enviando}
                style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: enviando ? "not-allowed" : "pointer", opacity: enviando ? 0.7 : 1 }}
              >
                {enviando ? "Procesando..." : "Confirmar pedido"}
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
      const precioFinal = item.discountPercent > 0
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
