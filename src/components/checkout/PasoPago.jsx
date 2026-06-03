import { soloNumeros, soloLetras, formatearTarjeta, formatearVencimiento } from "../../utils/formatters";
import ResumenPedido from "./ResumenPedido";

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "10px 14px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block", marginBottom: "6px",
};

const PasoPago = ({ pago, setPago, errorPago, enviando, onVolver, onConfirmar, carrito, subtotal }) => {
  const setP = (campo, valor) => setPago((prev) => ({ ...prev, [campo]: valor }));

  return (
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
              <input style={inputStyle} value={pago.nombreTarjeta} maxLength={60} onChange={e => setP("nombreTarjeta", soloLetras(e.target.value))} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Número de tarjeta</label>
              <input style={inputStyle} value={pago.numeroTarjeta} placeholder="0000 0000 0000 0000" maxLength={19} inputMode="numeric" onChange={e => setP("numeroTarjeta", formatearTarjeta(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Vencimiento</label>
              <input style={inputStyle} placeholder="MM/AA" maxLength={5} inputMode="numeric" value={pago.vencimiento} onChange={e => setP("vencimiento", formatearVencimiento(e.target.value, pago.vencimiento))} />
            </div>
            <div>
              <label style={labelStyle}>CVV</label>
              <input style={inputStyle} value={pago.cvv} maxLength={4} inputMode="numeric" placeholder="123" onChange={e => setP("cvv", soloNumeros(e.target.value))} />
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
            onClick={onVolver}
            style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "14px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
          >
            Volver
          </button>
          <button
            onClick={onConfirmar}
            disabled={enviando}
            style={{ background: "var(--primary)", color: "white", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: enviando ? "not-allowed" : "pointer", opacity: enviando ? 0.7 : 1 }}
          >
            {enviando ? "Procesando..." : "Confirmar pedido"}
          </button>
        </div>
      </div>
      <ResumenPedido carrito={carrito} subtotal={subtotal} />
    </div>
  );
};

export default PasoPago;
