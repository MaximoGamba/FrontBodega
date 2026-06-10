import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchColores, fetchCepas, fetchAzucares, fetchCrianzas, fetchElaboraciones, fetchMedidas } from "../../../services/api";
import FormCrear from "./FormCrear";
import FormEditar from "./FormEditar";
import TablaProductos from "./TablaProductos";

const SeccionProductos = () => {
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [version, setVersion] = useState(0);
  const [opciones, setOpciones] = useState(null);
  const [errorOpciones, setErrorOpciones] = useState(false);

  useEffect(() => {
    Promise.all([fetchColores(), fetchCepas(), fetchAzucares(), fetchCrianzas(), fetchElaboraciones(), fetchMedidas()])
      .then(([colores, cepas, azucares, crianzas, elaboraciones, medidas]) => {
        setOpciones({ colores, cepas, azucares, crianzas, elaboraciones, medidas });
      })
      .catch(() => {
        setErrorOpciones(true);
        toast.error("No se pudieron cargar las opciones del formulario.");
      });
  }, []);

  const abrirNuevo = () => { setEditando(null); setMostrarForm(true); };
  const abrirEditar = (p) => { setEditando(p); setMostrarForm(true); };
  const handleGuardado = () => { setMostrarForm(false); setVersion((v) => v + 1); };
  const handleCerrar = () => setMostrarForm(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={abrirNuevo}
          disabled={!opciones || errorOpciones}
          title={errorOpciones ? "No se pudieron cargar las opciones del formulario" : undefined}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: (!opciones || errorOpciones) ? "not-allowed" : "pointer", opacity: (!opciones || errorOpciones) ? 0.5 : 1 }}
        >
          {!opciones && !errorOpciones ? "Cargando..." : "+ Nuevo producto"}
        </button>
      </div>

      {mostrarForm && !editando && (
        <FormCrear opciones={opciones} onGuardado={handleGuardado} onCerrar={handleCerrar} />
      )}

      {mostrarForm && editando && (
        <FormEditar key={editando.id} producto={editando} opciones={opciones} onGuardado={handleGuardado} onCerrar={handleCerrar} />
      )}

      <TablaProductos version={version} onEditar={abrirEditar} />
    </>
  );
};

export default SeccionProductos;
