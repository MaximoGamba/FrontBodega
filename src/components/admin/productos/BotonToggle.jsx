import { toast } from "react-toastify";
import { estaActivo } from "../../../utils/productosSort";

const BotonToggle = ({ producto, onActualizado }) => {
  const activo = estaActivo(producto);
  const accion = activo ? "desactivar" : "reactivar";
  const toastId = `toggle-${producto.id}`;

  const confirmar = () => {
    if (toast.isActive(toastId)) return;
    toast(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "14px" }}>¿Desea {accion} este producto?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => { closeToast(); onActualizado(producto.id, !activo); }}
              style={{ background: "var(--primary)", color: "white", border: "none", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Confirmar
            </button>
            <button
              onClick={closeToast}
              style={{ background: "none", border: "1px solid #ccc", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { toastId, autoClose: false, closeButton: false }
    );
  };

  return (
    <button
      onClick={confirmar}
      style={{
        background: "none",
        border: activo ? "1px solid #e0b0b0" : "1px solid #b0c8b0",
        color: activo ? "#c0392b" : "#2d7a2d",
        padding: "6px 14px", fontSize: "11px", letterSpacing: "1px",
        textTransform: "uppercase", cursor: "pointer",
      }}
    >
      {activo ? "Desactivar" : "Reactivar"}
    </button>
  );
};

export default BotonToggle;
