import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { crearVino, mapVino } from "../../../services/api";
import { validarProducto } from "../../../utils/validators";
import CamposProducto from "./CamposProducto";
import GaleriaImagenesAdmin from "./galeria/GaleriaImagenesAdmin";

const campoVacio = {
  name: "", winery: "", year: "", price: "", stock: "",
  colorId: "", cepaId: "", azucarId: "", crianzaId: "", elaboracionId: "", medidaId: "",
  discountPercent: 0,
};

const FormCrear = ({ opciones, onGuardado, onCerrar }) => {
  const [form, setForm] = useState(null);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!opciones) return;
    const { colores, cepas, azucares, crianzas, elaboraciones, medidas } = opciones;
    setForm({
      ...campoVacio,
      colorId: colores[0]?.id ?? "", cepaId: cepas[0]?.id ?? "",
      azucarId: azucares[0]?.id ?? "", crianzaId: crianzas[0]?.id ?? "",
      elaboracionId: elaboraciones[0]?.id ?? "", medidaId: medidas[0]?.id ?? "",
    });
  }, [opciones]);

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

  const guardar = async () => {
    const e = validarProducto(form, imageUrl);
    setErrores(e);
    if (Object.keys(e).length > 0) return;
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
      const nuevo = await crearVino(datos);
      const idProducto = mapVino(nuevo).id;
      const todasImagenes = [...new Set([imageUrl, ...imagenesSeleccionadas])].filter(Boolean);
      if (idProducto && todasImagenes.length > 0)
        localStorage.setItem(`bodega_imgs_${idProducto}`, JSON.stringify(todasImagenes));
      onGuardado();
    } catch {
      toast.error("Error al crear el producto.");
    } finally {
      setGuardando(false);
    }
  };

  if (!form) {
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
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "20px", marginBottom: "24px" }}>Nuevo producto</p>
      <CamposProducto form={form} errores={errores} handleChange={handleChange} selectOpciones={selectOpciones} />
      <GaleriaImagenesAdmin imagenInicial="" productId={null} error={errores.imagen} onChange={handleGaleriaChange} />
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <button onClick={guardar} disabled={guardando} style={{ background: "var(--primary)", color: "white", border: "none", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: guardando ? "not-allowed" : "pointer", opacity: guardando ? 0.7 : 1 }}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        <button onClick={confirmarCerrar} style={{ background: "white", color: "var(--neutral)", border: "1px solid var(--border)", padding: "12px 32px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormCrear;
