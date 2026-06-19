import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUsuario } from "@/redux/usersSlice";
import { inputStyle, labelStyle } from "../../styles/profileStyles";
import Boton from "../shared/Boton";

const CampoEditable = ({ label, valor, campo, userId }) => {
  const dispatch = useDispatch();
  const guardando = useSelector((state) => state.users.loadingMutacion);
  const [editando, setEditando] = useState(false);
  const [input, setInput] = useState(valor || "");
  const [error, setError] = useState("");

  const guardar = async () => {
    if (!input.trim()) return;
    setError("");
    const result = await dispatch(putUsuario({ userId, datos: { [campo]: input.trim() } }));
    if (putUsuario.fulfilled.match(result)) {
      setEditando(false);
    } else {
      setError("Error al guardar.");
    }
  };

  const cancelar = () => { setInput(valor || ""); setError(""); setEditando(false); };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p style={labelStyle}>{label}</p>
      {editando ? (
        <div>
          <input
            autoFocus
            style={{ ...inputStyle, marginBottom: "8px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {error && <p style={{ fontSize: "12px", color: "var(--primary)", marginBottom: "8px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "8px" }}>
            <Boton variante="primario" tamaño="sm" disabled={guardando} onClick={guardar}>
              {guardando ? "Guardando..." : "Guardar"}
            </Boton>
            <Boton variante="secundario" tamaño="sm" onClick={cancelar}>Cancelar</Boton>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "15px", margin: 0 }}>{valor || "—"}</p>
          <button
            onClick={() => { setInput(valor || ""); setEditando(true); }}
            style={{ background: "none", border: "none", fontSize: "12px", color: "var(--gray)", cursor: "pointer", textDecoration: "underline" }}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default CampoEditable;
