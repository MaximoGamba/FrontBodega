import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  fetchVinosAdmin, crearVino, actualizarVino, desactivarVinoAPI, reactivarVinoAPI, mapVino, uploadImagen,
  fetchColores, fetchCepas, fetchAzucares, fetchCrianzas, fetchElaboraciones, fetchMedidas,
} from "../../services/api";
import ProductoForm from "./ProductoForm";
import TablaProductos from "./TablaProductos";

const campoVacio = {
  name: "", winery: "", year: "", price: "", stock: "",
  colorId: "", cepaId: "", azucarId: "", crianzaId: "", elaboracionId: "", medidaId: "",
  discountPercent: 0,
};

const SeccionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [form, setForm] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  const [galeria, setGaleria] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bodega_imagenes")) || []; }
    catch { return []; }
  });
  const [colores, setColores] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [azucares, setAzucares] = useState([]);
  const [crianzas, setCrianzas] = useState([]);
  const [elaboraciones, setElaboraciones] = useState([]);
  const [medidas, setMedidas] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchVinosAdmin(), fetchColores(), fetchCepas(),
      fetchAzucares(), fetchCrianzas(), fetchElaboraciones(), fetchMedidas(),
    ]).then(([vinos, cols, ceps, azus, cris, elabs, meds]) => {
      setProductos([...vinos].sort((a, b) => {
        if (a.active === b.active) return b.id - a.id;
        return a.active === false ? 1 : -1;
      }));
      setColores(cols); setCepas(ceps); setAzucares(azus);
      setCrianzas(cris); setElaboraciones(elabs); setMedidas(meds);
      setCargando(false);
      const urlsExistentes = vinos.map((v) => v.imagen).filter(Boolean);
      setGaleria((prev) => {
        const todas = [...new Set([...prev, ...urlsExistentes])];
        localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
        return todas;
      });
    }).catch(() => setCargando(false));
  }, []);

  const abrirNuevo = () => {
    setForm({
      ...campoVacio,
      colorId: colores[0]?.id ?? "", cepaId: cepas[0]?.id ?? "",
      azucarId: azucares[0]?.id ?? "", crianzaId: crianzas[0]?.id ?? "",
      elaboracionId: elaboraciones[0]?.id ?? "", medidaId: medidas[0]?.id ?? "",
    });
    setImagenesSeleccionadas([]);
    setEditandoId(null);
  };

  const abrirEditar = (producto) => {
    const guardadas = (() => { try { return JSON.parse(localStorage.getItem(`bodega_imgs_${producto.id}`)) || []; } catch { return []; } })();
    const principal = producto.imageUrl || producto.imagen || "";
    setImagenesSeleccionadas([...new Set([principal, ...guardadas])].filter(Boolean));
    setForm({ ...producto });
    setEditandoId(producto.id);
    setErrores({});
  };

  const cerrar = () => { setForm(null); setEditandoId(null); setErrores({}); setImagenesSeleccionadas([]); };

  const handleChange = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
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
    if (!form.imageUrl && !form.imagen) e.imagen = "La imagen es obligatoria.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleImagen = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setSubiendoImagen(true);
    const urlsSubidas = [];
    try {
      for (const file of files) {
        const url = await uploadImagen(file);
        urlsSubidas.push(url);
      }
      setGaleria((prev) => {
        const todas = [...new Set([...urlsSubidas, ...prev])];
        localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
        return todas;
      });
      setImagenesSeleccionadas((prev) => [...new Set([...prev, ...urlsSubidas])]);
      setForm((f) => ({ ...f, imageUrl: f.imageUrl || f.imagen || urlsSubidas[0] }));
    } catch {
      if (urlsSubidas.length > 0) {
        setGaleria((prev) => {
          const todas = [...new Set([...urlsSubidas, ...prev])];
          localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
          return todas;
        });
        setImagenesSeleccionadas((prev) => [...new Set([...prev, ...urlsSubidas])]);
        toast.warning(`Se subieron ${urlsSubidas.length} de ${files.length} imágenes.`);
      } else {
        toast.error("Error al subir las imágenes.");
      }
    } finally {
      setSubiendoImagen(false);
      e.target.value = "";
    }
  };

  const onSetPrincipal = (url) => setForm((f) => ({ ...f, imageUrl: url }));

  const onEliminarImagen = (url) => {
    setImagenesSeleccionadas((prev) => prev.filter((u) => u !== url));
    setForm((f) => {
      if ((f.imageUrl || f.imagen) === url) {
        const otra = imagenesSeleccionadas.find((u) => u !== url) || "";
        return { ...f, imageUrl: otra, imagen: otra };
      }
      return f;
    });
  };

  const onSelectFromGallery = (url) => {
    setImagenesSeleccionadas((prev) => [...new Set([...prev, url])]);
    setForm((f) => ({ ...f, imageUrl: f.imageUrl || f.imagen || url }));
  };

  const guardar = async () => {
    if (!validar()) return;
    const datos = {
      name: form.name, winery: form.winery, year: Number(form.year),
      price: Number(form.price), stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      colorId: Number(form.colorId), cepaId: Number(form.cepaId),
      azucarId: Number(form.azucarId), crianzaId: Number(form.crianzaId),
      elaboracionId: Number(form.elaboracionId), medidaId: Number(form.medidaId),
      imageUrl: form.imageUrl || form.imagen || null,
    };
    setGuardando(true);
    try {
      let idProducto;
      if (editandoId) {
        const actualizado = await actualizarVino(editandoId, datos);
        setProductos((prev) => prev.map((p) => (p.id === editandoId ? mapVino(actualizado) : p)));
        idProducto = editandoId;
      } else {
        const nuevo = await crearVino(datos);
        const mapeado = mapVino(nuevo);
        setProductos((prev) => [mapeado, ...prev]);
        idProducto = mapeado.id;
      }
      const todasImagenes = [...new Set([datos.imageUrl, ...imagenesSeleccionadas])].filter(Boolean);
      if (idProducto && todasImagenes.length > 0)
        localStorage.setItem(`bodega_imgs_${idProducto}`, JSON.stringify(todasImagenes));
      cerrar();
    } catch {
      toast.error("Error al guardar el producto.");
    } finally {
      setGuardando(false);
    }
  };

  const toggleActivo = (producto) => {
    const accion = producto.active !== false ? "desactivar" : "reactivar";
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Desea {accion} este producto?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={async () => {
                closeToast();
                try {
                  if (producto.active !== false) await desactivarVinoAPI(producto.id);
                  else await reactivarVinoAPI(producto.id);
                  setProductos((prev) => {
                    const updated = prev.map((p) => p.id === producto.id ? { ...p, active: producto.active === false } : p);
                    return updated.sort((a, b) => {
                      if (a.active === b.active) return b.id - a.id;
                      return a.active === false ? 1 : -1;
                    });
                  });
                } catch { toast.error(`Error al ${accion} el producto.`); }
              }}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >Confirmar</button>
            <button onClick={closeToast} style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>Cancelar</button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  const selectOpciones = [
    { label: "Color",       campo: "colorId",       opciones: colores },
    { label: "Cepa",        campo: "cepaId",         opciones: cepas },
    { label: "Azúcar",      campo: "azucarId",       opciones: azucares },
    { label: "Crianza",     campo: "crianzaId",      opciones: crianzas },
    { label: "Elaboración", campo: "elaboracionId",  opciones: elaboraciones },
    { label: "Medida",      campo: "medidaId",       opciones: medidas },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={abrirNuevo}
          disabled={cargando}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
        >
          + Nuevo producto
        </button>
      </div>

      {form && (
        <ProductoForm
          form={form}
          editandoId={editandoId}
          errores={errores}
          guardando={guardando}
          handleChange={handleChange}
          guardar={guardar}
          cerrar={cerrar}
          selectOpciones={selectOpciones}
          imagenesSeleccionadas={imagenesSeleccionadas}
          galeria={galeria}
          subiendoImagen={subiendoImagen}
          handleImagen={handleImagen}
          onSetPrincipal={onSetPrincipal}
          onEliminarImagen={onEliminarImagen}
          onSelectFromGallery={onSelectFromGallery}
        />
      )}

      <TablaProductos
        productos={productos}
        cargando={cargando}
        onEditar={abrirEditar}
        onToggle={toggleActivo}
      />
    </>
  );
};

export default SeccionProductos;
