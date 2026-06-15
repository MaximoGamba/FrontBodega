import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadImagenThunk } from "../../../../redux/galeriaSlice";

const LIMITE_GALERIA = 100;

const useImagenGaleria = ({ imagenInicial, onChange }) => {
  const dispatch       = useDispatch();
  const subiendoImagen = useSelector((state) => state.galeria.subiendo);

  const [mostrarGaleria,        setMostrarGaleria]        = useState(false);
  const [imagenPrincipal,       setImagenPrincipal]       = useState(imagenInicial || "");
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState(
    imagenInicial ? [imagenInicial] : []
  );
  const [galeria, setGaleria] = useState(imagenInicial ? [imagenInicial] : []);

  const notificar = (principal) => onChange?.(principal);

  const handleImagen = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const urlsSubidas = [];

    for (const file of files) {
      const result = await dispatch(uploadImagenThunk(file));
      if (uploadImagenThunk.fulfilled.match(result)) {
        urlsSubidas.push(result.payload);
      }
    }

    if (urlsSubidas.length === 0) {
      toast.error("Error al subir las imágenes.");
      e.target.value = "";
      return;
    }

    if (urlsSubidas.length < files.length) {
      toast.warning(`Se subieron ${urlsSubidas.length} de ${files.length} imágenes.`);
    }

    const nuevasSeleccionadas = [...new Set([...imagenesSeleccionadas, ...urlsSubidas])];
    const nuevaPrincipal      = imagenPrincipal || urlsSubidas[0];
    setGaleria((prev) => [...new Set([...urlsSubidas, ...prev])].slice(0, LIMITE_GALERIA));
    setImagenesSeleccionadas(nuevasSeleccionadas);
    setImagenPrincipal(nuevaPrincipal);
    notificar(nuevaPrincipal);
    e.target.value = "";
  };

  const onSetPrincipal = (url) => {
    setImagenPrincipal(url);
    notificar(url);
  };

  const onEliminarImagen = (url) => {
    const nuevas         = imagenesSeleccionadas.filter((u) => u !== url);
    const nuevaPrincipal = imagenPrincipal === url ? (nuevas[0] || "") : imagenPrincipal;
    setImagenesSeleccionadas(nuevas);
    setImagenPrincipal(nuevaPrincipal);
    notificar(nuevaPrincipal);
  };

  const onSelectFromGallery = (url) => {
    const nuevas         = [...new Set([...imagenesSeleccionadas, url])];
    const nuevaPrincipal = imagenPrincipal || url;
    setImagenesSeleccionadas(nuevas);
    setImagenPrincipal(nuevaPrincipal);
    setMostrarGaleria(false);
    notificar(nuevaPrincipal);
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
