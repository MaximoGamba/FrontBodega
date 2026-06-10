import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImagen } from "../../services/api";
import { labelStyle, errorStyle } from "./adminConstants";

const GaleriaImagenesAdmin = ({ imagenInicial, productId, error, onChange }) => {
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  const [imagenPrincipal, setImagenPrincipal] = useState(imagenInicial || "");

  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState(() => {
    const guardadas = (() => {
      try { return JSON.parse(localStorage.getItem(`bodega_imgs_${productId}`)) || []; }
      catch { return []; }
    })();
    return [...new Set([imagenInicial, ...guardadas])].filter(Boolean);
  });

  const [galeria, setGaleria] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bodega_imagenes")) || []; }
    catch { return []; }
  });

  const LIMITE_GALERIA = 100;

  const notificar = (principal, imgs) => onChange?.(principal, imgs);

  const actualizarGaleria = (nuevas, prev) => {
    const todas = [...new Set([...nuevas, ...prev])].slice(0, LIMITE_GALERIA);
    localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
    return todas;
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
      const nuevasSeleccionadas = [...new Set([...imagenesSeleccionadas, ...urlsSubidas])];
      const nuevaPrincipal = imagenPrincipal || urlsSubidas[0];
      setGaleria((prev) => actualizarGaleria(urlsSubidas, prev));
      setImagenesSeleccionadas(nuevasSeleccionadas);
      setImagenPrincipal(nuevaPrincipal);
      notificar(nuevaPrincipal, nuevasSeleccionadas);
    } catch {
      if (urlsSubidas.length > 0) {
        const nuevasSeleccionadas = [...new Set([...imagenesSeleccionadas, ...urlsSubidas])];
        const nuevaPrincipal = imagenPrincipal || urlsSubidas[0];
        setGaleria((prev) => {
          const todas = [...new Set([...urlsSubidas, ...prev])];
          localStorage.setItem("bodega_imagenes", JSON.stringify(todas));
          return todas;
        });
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

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ ...labelStyle, color: error ? "#c0392b" : undefined }}>Imágenes del producto *</label>

      {imagenesSeleccionadas.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
          {imagenesSeleccionadas.map((url) => {
            const esPrincipal = imagenPrincipal === url;
            return (
              <div key={url} style={{ position: "relative", width: "72px", flexShrink: 0 }}>
                <img src={url} alt="" style={{ width: "72px", height: "72px", objectFit: "cover", border: `2px solid ${esPrincipal ? "var(--primary)" : "var(--border)"}` }} />
                {esPrincipal ? (
                  <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "var(--primary)", color: "white", fontSize: "8px", textAlign: "center", padding: "2px", letterSpacing: "0.5px" }}>
                    PRINCIPAL
                  </span>
                ) : (
                  <button type="button" onClick={() => onSetPrincipal(url)}
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "white", border: "none", fontSize: "8px", cursor: "pointer", padding: "2px", letterSpacing: "0.5px" }}>
                    PRINCIPAL
                  </button>
                )}
                <button type="button" onClick={() => onEliminarImagen(url)}
                  style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.6)", color: "white", border: "none", width: "18px", height: "18px", cursor: "pointer", fontSize: "13px", lineHeight: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button type="button" onClick={() => setMostrarGaleria((v) => !v)}
          style={{ background: "white", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer" }}>
          {mostrarGaleria ? "Cerrar galería" : "Elegir de galería"}
        </button>
        <label style={{ background: "white", border: "1px solid var(--border)", padding: "6px 14px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", cursor: subiendoImagen ? "not-allowed" : "pointer", opacity: subiendoImagen ? 0.6 : 1 }}>
          {subiendoImagen ? "Subiendo..." : "Subir fotos"}
          <input type="file" accept="image/*" multiple onChange={handleImagen} disabled={subiendoImagen} style={{ display: "none" }} />
        </label>
      </div>

      {error && <span style={errorStyle}>{error}</span>}

      {mostrarGaleria && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px", padding: "12px", border: "1px solid var(--border)", background: "#fafafa", maxHeight: "220px", overflowY: "auto" }}>
          {galeria.length === 0 && (
            <p style={{ gridColumn: "1/-1", fontSize: "12px", color: "var(--gray)" }}>No hay imágenes guardadas aún.</p>
          )}
          {galeria.map((url) => {
            const yaAgregada = imagenesSeleccionadas.includes(url);
            return (
              <div key={url} style={{ position: "relative" }}>
                <img
                  src={url}
                  alt=""
                  onClick={() => onSelectFromGallery(url)}
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover", cursor: "pointer", border: yaAgregada ? "2px solid var(--primary)" : "2px solid transparent", opacity: yaAgregada ? 1 : 0.85 }}
                />
                {yaAgregada && (
                  <span style={{ position: "absolute", top: "2px", right: "2px", background: "var(--primary)", color: "white", fontSize: "9px", padding: "1px 4px" }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GaleriaImagenesAdmin;
