import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postVino, putVino } from "@/redux/vinosSlice";
import { validarProducto } from "@/utils/validators";

const CAMPOS_VACIOS = {
  name: "", winery: "", year: "", price: "", stock: "",
  colorId: "", cepaId: "", azucarId: "", crianzaId: "", elaboracionId: "", medidaId: "",
  discountPercent: 0,
};

const useProductoForm = ({ producto, opciones, onGuardado, onCerrar }) => {
  const dispatch = useDispatch();
  const esEdicion = Boolean(producto);

  const [form, setForm] = useState(null);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [imageUrl, setImageUrl] = useState(producto?.imageUrl || producto?.imagen || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!opciones) return;
    if (esEdicion) {
      setForm({ ...producto });
    } else {
      const { colores, cepas, azucares, crianzas, elaboraciones, medidas } = opciones;
      setForm({
        ...CAMPOS_VACIOS,
        colorId: colores[0]?.id ?? "",
        cepaId: cepas[0]?.id ?? "",
        azucarId: azucares[0]?.id ?? "",
        crianzaId: crianzas[0]?.id ?? "",
        elaboracionId: elaboraciones[0]?.id ?? "",
        medidaId: medidas[0]?.id ?? "",
      });
    }
  }, [opciones, esEdicion, producto]);

  const handleChange = (campo, valor) => {
    setIsDirty(true);
    setForm((f) => ({ ...f, [campo]: valor }));
    setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  const handleGaleriaChange = (url) => {
    setIsDirty(true);
    setImageUrl(url);
    if (url) setErrores((e) => ({ ...e, imagen: undefined }));
  };

  const confirmarCerrar = () => {
    if (!isDirty) { onCerrar(); return; }
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Descartar los cambios sin guardar?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => { closeToast(); onCerrar(); }}
              style={{ background: "#c0392b", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Descartar
            </button>
            <button
              onClick={closeToast}
              style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Seguir editando
            </button>
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
      name: form.name,
      winery: form.winery,
      year: form.year !== "" && form.year != null ? Number(form.year) : null,
      price: Number(form.price),
      stock: Number(form.stock),
      discountPercent: Number(form.discountPercent),
      colorId: Number(form.colorId),
      cepaId: Number(form.cepaId),
      azucarId: Number(form.azucarId),
      crianzaId: Number(form.crianzaId),
      elaboracionId: Number(form.elaboracionId),
      medidaId: Number(form.medidaId),
      imageUrl: imageUrl || null,
    };

    setGuardando(true);
    try {
      if (esEdicion) {
        const result = await dispatch(putVino({ id: producto.id, datos }));
        if (putVino.rejected.match(result)) throw new Error(result.payload);
      } else {
        const result = await dispatch(postVino(datos));
        if (postVino.rejected.match(result)) throw new Error(result.payload);
      }
      onGuardado();
    } catch {
      toast.error(esEdicion ? "Error al actualizar el producto." : "Error al crear el producto.");
    } finally {
      setGuardando(false);
    }
  };

  return { form, errores, guardando, handleChange, handleGaleriaChange, confirmarCerrar, guardar };
};

export default useProductoForm;
