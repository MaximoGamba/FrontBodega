import { inputStyle, labelStyle, errorStyle } from "./adminConstants";
import GaleriaImagenesAdmin from "./GaleriaImagenesAdmin";

const ProductoForm = ({
  form, editandoId, errores, guardando,
  handleChange, guardar, cerrar, selectOpciones,
  imagenesSeleccionadas, galeria,
  subiendoImagen, handleImagen,
  onSetPrincipal, onEliminarImagen, onSelectFromGallery,
}) => (
  <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px" }}>
    <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>
      {editandoId ? "Editar producto" : "Nuevo producto"}
    </p>

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

    <GaleriaImagenesAdmin
      imagenesSeleccionadas={imagenesSeleccionadas}
      imagenPrincipal={form.imageUrl || form.imagen}
      galeria={galeria}
      subiendoImagen={subiendoImagen}
      handleImagen={handleImagen}
      onSetPrincipal={onSetPrincipal}
      onEliminarImagen={onEliminarImagen}
      onSelectFromGallery={onSelectFromGallery}
      error={errores.imagen}
    />

    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
      <button
        onClick={guardar}
        disabled={guardando}
        style={{ background: "var(--primary)", color: "white", border: "none", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: guardando ? "not-allowed" : "pointer", opacity: guardando ? 0.7 : 1 }}
      >
        {guardando ? "Guardando..." : "Guardar"}
      </button>
      <button
        onClick={cerrar}
        style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
      >
        Cancelar
      </button>
    </div>
  </div>
);

export default ProductoForm;
