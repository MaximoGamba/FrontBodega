import { soloLetras, soloNumerosYSignos, soloNumeros } from "../../utils/formatters";
import ResumenPedido from "./ResumenPedido";

const inputStyle = {
  width: "100%", border: "1px solid var(--border)", padding: "10px 14px",
  fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase",
  color: "var(--gray)", display: "block", marginBottom: "6px",
};

const PasoEnvio = ({ envio, setE, errorEnvio, onContinuar, carrito, subtotal }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "start" }}>
    <div>
      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "28px" }}>
        Datos de envío
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Nombre</label>
          <input style={inputStyle} value={envio.nombre} maxLength={50} onChange={e => setE("nombre", soloLetras(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Apellido</label>
          <input style={inputStyle} value={envio.apellido} maxLength={50} onChange={e => setE("apellido", soloLetras(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" value={envio.email} maxLength={100} onChange={e => setE("email", e.target.value.trim())} />
        </div>
        <div>
          <label style={labelStyle}>Teléfono</label>
          <input style={inputStyle} value={envio.telefono} maxLength={15} placeholder="+54 11 1234-5678" onChange={e => setE("telefono", soloNumerosYSignos(e.target.value))} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Dirección</label>
          <input style={inputStyle} value={envio.direccion} maxLength={150} onChange={e => setE("direccion", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Ciudad</label>
          <input style={inputStyle} value={envio.ciudad} maxLength={60} onChange={e => setE("ciudad", soloLetras(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Provincia</label>
          <input style={inputStyle} value={envio.provincia} maxLength={60} onChange={e => setE("provincia", soloLetras(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>Código Postal</label>
          <input style={inputStyle} value={envio.codigoPostal} maxLength={8} placeholder="1234" onChange={e => setE("codigoPostal", soloNumeros(e.target.value))} />
        </div>
      </div>
      {errorEnvio && (
        <p style={{ fontSize: "13px", color: "var(--primary)", marginTop: "16px" }}>{errorEnvio}</p>
      )}
      <button
        onClick={onContinuar}
        style={{ marginTop: "16px", background: "var(--primary)", color: "white", border: "none", padding: "14px 40px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
      >
        Continuar
      </button>
    </div>
    <ResumenPedido carrito={carrito} subtotal={subtotal} />
  </div>
);

export default PasoEnvio;
