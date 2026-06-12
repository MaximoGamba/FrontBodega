import { useState } from "react";
import { useDispatch } from "react-redux";
import { desactivarVino, reactivarVino } from "../../../redux/slices/vinosSlice";
import ModalConfirmar from "../../ModalConfirmar";

const BotonToggle = ({ producto }) => {
  const dispatch = useDispatch();
  const activo = producto.active !== false;
  const [modal, setModal] = useState(false);

  const confirmar = () => setModal(true);

  const ejecutar = () => {
    if (activo) dispatch(desactivarVino(producto.id));
    else dispatch(reactivarVino(producto.id));
    setModal(false);
  };

  return (
    <>
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

      <ModalConfirmar
        visible={modal}
        mensaje={`¿Querés ${activo ? "desactivar" : "reactivar"} este producto?`}
        textoConfirmar={activo ? "Desactivar" : "Reactivar"}
        peligroso={activo}
        onConfirmar={ejecutar}
        onCancelar={() => setModal(false)}
      />
    </>
  );
};

export default BotonToggle;
