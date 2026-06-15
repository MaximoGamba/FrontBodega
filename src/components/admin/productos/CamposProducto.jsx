import { inputStyle, labelStyle, errorStyle } from "../../../styles/adminStyles";

const CamposProducto = ({ form, errores, handleChange, selectOpciones }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
    <div>
      <label style={labelStyle}>Nombre *</label>
      <input style={{ ...inputStyle, borderColor: errores.name ? "#c0392b" : undefined }} value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
      {errores.name && <span style={errorStyle}>{errores.name}</span>}
    </div>
    <div>
      <label style={labelStyle}>Bodega *</label>
      <input style={{ ...inputStyle, borderColor: errores.winery ? "#c0392b" : undefined }} value={form.winery} onChange={(e) => handleChange("winery", e.target.value)} />
      {errores.winery && <span style={errorStyle}>{errores.winery}</span>}
    </div>
    <div>
      <label style={labelStyle}>Año</label>
      <input style={{ ...inputStyle, borderColor: errores.year ? "#c0392b" : undefined }} type="number" min="1800" max={new Date().getFullYear()} value={form.year} onChange={(e) => handleChange("year", e.target.value)} />
      {errores.year && <span style={errorStyle}>{errores.year}</span>}
    </div>
    <div>
      <label style={labelStyle}>Precio *</label>
      <input style={{ ...inputStyle, borderColor: errores.price ? "#c0392b" : undefined }} type="number" min="1" step="0.01" value={form.price} onChange={(e) => handleChange("price", e.target.value)} />
      {errores.price && <span style={errorStyle}>{errores.price}</span>}
    </div>
    <div>
      <label style={labelStyle}>Stock</label>
      <input style={{ ...inputStyle, borderColor: errores.stock ? "#c0392b" : undefined }} type="number" min="0" value={form.stock} onChange={(e) => handleChange("stock", e.target.value)} />
      {errores.stock && <span style={errorStyle}>{errores.stock}</span>}
    </div>
    <div>
      <label style={labelStyle}>Descuento (%)</label>
      <input style={{ ...inputStyle, borderColor: errores.discountPercent ? "#c0392b" : undefined }} type="number" min="0" max="100" value={form.discountPercent} onChange={(e) => handleChange("discountPercent", e.target.value)} />
      {errores.discountPercent && <span style={errorStyle}>{errores.discountPercent}</span>}
    </div>
    {selectOpciones.map(({ label, campo, opciones }) => (
      <div key={campo}>
        <label style={labelStyle}>{label}</label>
        <select style={{ ...inputStyle, background: "white" }} value={form[campo]} onChange={(e) => handleChange(campo, e.target.value)}>
          {opciones.map((op) => <option key={op.id} value={op.id}>{op.name}</option>)}
        </select>
      </div>
    ))}
  </div>
);

export default CamposProducto;
