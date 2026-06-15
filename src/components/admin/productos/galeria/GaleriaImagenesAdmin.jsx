import useImagenGaleria from "./useImagenGaleria";
import { labelStyle, errorStyle } from "../../../../styles/adminStyles";
import MiniaturaImagen from "./MiniaturaImagen";

const GaleriaImagenesAdmin = ({ imagenInicial, error, onChange }) => {
  const {
    mostrarGaleria, subiendoImagen, imagenPrincipal, imagenesSeleccionadas,
    galeria, toggleGaleria, handleImagen, onSetPrincipal, onEliminarImagen, onSelectFromGallery,
  } = useImagenGaleria({ imagenInicial, onChange });

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ ...labelStyle, color: error ? "#c0392b" : undefined }}>Imágenes del producto *</label>

      {imagenesSeleccionadas.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
          {imagenesSeleccionadas.map((url) => (
            <MiniaturaImagen
              key={url}
              url={url}
              esPrincipal={imagenPrincipal === url}
              onSetPrincipal={onSetPrincipal}
              onEliminar={onEliminarImagen}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button type="button" onClick={toggleGaleria}
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
