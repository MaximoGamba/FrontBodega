import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImagen } from "../services/api";

const LIMITE_GALERIA = 100;

const leerStorage = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const guardarGaleriaStorage = (nuevas, prev) => {
  const todas = [...new Set([...nuevas, ...prev])].slice(0, LIMITE_GALERIA);
  localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
  return todas;
};

const useImagenGaleria = ({ imagenInicial, productId, onChange }) => {
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [imagenPrincipal, setImagenPrincipal] = useState(imagenInicial || "");

  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState(() => {
    const guardadas = leerStorage(`bodega_imgs_${productId}`);
    return [...new Set([imagenInicial, ...guardadas])].filter(Boolean);
  });

  const [galeria, setGaleria] = useState(() => leerStorage("bodega_imagenes"));

  const notificar = (principal, imgs) => onChange?.(principal, imgs);

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
      const nuevasSeleccionadas = [...new Set([...imagenesSeleccionadas, ...urlsSubidas])];
      const nuevaPrincipal = imagenPrincipal || urlsSubidas[0];
      setGaleria((prev) => guardarGaleriaStorage(urlsSubidas, prev));
      setImagenesSeleccionadas(nuevasSeleccionadas);
      setImagenPrincipal(nuevaPrincipal);
      notificar(nuevaPrincipal, nuevasSeleccionadas);
    } catch {
      if (urlsSubidas.length > 0) {
        const nuevasSeleccionadas = [...new Set([...imagenesSeleccionadas, ...urlsSubidas])];
        const nuevaPrincipal = imagenPrincipal || urlsSubidas[0];
        setGaleria((prev) => guardarGaleriaStorage(urlsSubidas, prev));
        setImagenesSeleccionadas(nuevasSeleccionadas);
        setImagenPrincipal(nuevaPrincipal);
        notificar(nuevaPrincipal, nuevasSeleccionadas);
        toast.warning(`Se subieron ${urlsSubidas.length} de ${files.length} imágenes.`);
      } else {
        toast.error("Error al subir las imágenes.");
      }
    } finally {
      setSubiendoImagen(false);
      e.target.value = "";
    }
  };

  const onSetPrincipal = (url) => {
    setImagenPrincipal(url);
    notificar(url, imagenesSeleccionadas);
  };

  const onEliminarImagen = (url) => {
    const nuevas = imagenesSeleccionadas.filter((u) => u !== url);
    const nuevaPrincipal = imagenPrincipal === url ? (nuevas[0] || "") : imagenPrincipal;
    setImagenesSeleccionadas(nuevas);
    setImagenPrincipal(nuevaPrincipal);
    notificar(nuevaPrincipal, nuevas);
  };

  const onSelectFromGallery = (url) => {
    const nuevas = [...new Set([...imagenesSeleccionadas, url])];
    const nuevaPrincipal = imagenPrincipal || url;
    setImagenesSeleccionadas(nuevas);
    setImagenPrincipal(nuevaPrincipal);
    setMostrarGaleria(false);
    notificar(nuevaPrincipal, nuevas);
  };

  return {
    mostrarGaleria,
    subiendoImagen,
    imagenPrincipal,
    imagenesSeleccionadas,
    galeria,
    toggleGaleria: () => setMostrarGaleria((v) => !v),
    handleImagen,
    onSetPrincipal,
    onEliminarImagen,
    onSelectFromGallery,
  };
};

export default useImagenGaleria;
