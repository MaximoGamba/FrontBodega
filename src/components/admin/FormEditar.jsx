import { useState } from "react";
import { toast } from "react-toastify";
import { actualizarVino } from "../../services/api";
import { inputStyle, labelStyle, errorStyle } from "./adminConstants";
import GaleriaImagenesAdmin from "./GaleriaImagenesAdmin";

const FormEditar = ({ producto, opciones, onGuardado, onCerrar }) => {
  const [form, setForm] = useState({ ...producto });
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [imageUrl, setImageUrl] = useState(producto.imageUrl || producto.imagen || "");
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (campo, valor) => {
    setIsDirty(true);
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const handleGaleriaChange = (url, imgs) => {
    setIsDirty(true);
    setImageUrl(url);
    setImagenesSeleccionadas(imgs);
    if (url) setErrores((e) => ({ ...e, imagen: undefined }));
  };

  const confirmarCerrar = () => {
    if (!isDirty) { onCerrar(); return; }
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Descartar los cambios sin guardar?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => { closeToast(); onCerrar(); }} style={{ background: "#c0392b", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Descartar</button>
            <button onClick={closeToast} style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Seguir editando</button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  const validar = () => {
    const e = {};
    const anioActual = new Date().getFullYear();
    if (!form.name?.trim()) e.name = "El nombre es obligatorio.";
    else if (form.name.trim().length < 2) e.name = "Mínimo 2 caracteres.";
    if (!form.winery?.trim()) e.winery = "La bodega es obligatoria.";
    if (!form.price || Number(form.price) <= 0) e.price = "El precio debe ser mayor a 0.";
    if (form.stock === "" || form.stock === null || form.stock === undefined || Number(form.stock) < 0)
      e.stock = "El stock no puede ser negativo.";
    if (form.year !== "" && form.year !== null && form.year !== undefined) {
      const y = Number(form.year);
      if (!Number.isInteger(y) || y < 1800 || y > anioActual)
        e.year = `El año debe estar entre 1800 y ${anioActual}.`;
    }
    const desc = form.discountPercent === "" || form.discountPercent === null || form.discountPercent === undefined
      ? NaN : Number(form.discountPercent);
    if (isNaN(desc) || desc < 0 || desc > 100) e.discountPercent = "El descuento debe estar entre 0 y 100.";
    if (!imageUrl) e.imagen = "La imagen es obligatoria.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardar = async () => {
    if (!validar()) return;
    const datos = {
      name: form.name, winery: form.winery, year: form.year !== "" && form.year != null ? Number(form.year) : null,
      price: Number(form.price), stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      colorId: Number(form.colorId), cepaId: Number(form.cepaId),
      azucarId: Number(form.azucarId), crianzaId: Number(form.crianzaId),
      elaboracionId: Number(form.elaboracionId), medidaId: Number(form.medidaId),
      imageUrl: imageUrl || null,
    };
    setGuardando(true);
    try {
      await actualizarVino(producto.id, datos);
      const todasImagenes = [...new Set([imageUrl, ...imagenesSeleccionadas])].filter(Boolean);
      if (todasImagenes.length > 0)
        localStorage.setItem(`bodega_imgs_${producto.id}`, JSON.stringify(todasImagenes));
      onGuardado();
    } catch {
      toast.error("Error al actualizar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  if (!opciones) {
    return <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px", color: "var(--gray)", fontSize: "14px" }}>Cargando formulario...</div>;
  }

  const { colores, cepas, azucares, crianzas, elaboraciones, medidas } = opciones;
  const selectOpciones = [
    { label: "Color",       campo: "colorId",      opciones: colores },
    { label: "Cepa",        campo: "cepaId",        opciones: cepas },
    { label: "Azúcar",      campo: "azucarId",      opciones: azucares },
    { label: "Crianza",     campo: "crianzaId",     opciones: crianzas },
    { label: "Elaboración", campo: "elaboracionId", opciones: elaboraciones },
    { label: "Medida",      campo: "medidaId",      opciones: medidas },
  ];

  return (
    <div style={{ border: "1px solid var(--border)", padding: "28px", marginBottom: "40px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>Editar producto</p>

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
        {selectOpciones.map(({ label, campo, opciones: ops }) => (
          <div key={campo}>
            <label style={labelStyle}>{label}</label>
            <select style={{ ...inputStyle, background: "white" }} value={form[campo]} onChange={(e) => handleChange(campo, e.target.value)}>
              {ops.map((op) => <option key={op.id} value={op.id}>{op.name}</option>)}
            </select>
          </div>
        ))}
      </div>

      <GaleriaImagenesAdmin
        imagenInicial={producto.imageUrl || producto.imagen || ""}
        productId={producto.id}
        error={errores.imagen}
        onChange={handleGaleriaChange}
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
          onClick={confirmarCerrar}
          style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormEditar;
