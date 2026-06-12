import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogos } from "../../../redux/slices/catalogosSlice";
import { fetchVinosAdmin } from "../../../redux/slices/vinosSlice";
import FormCrear from "./FormCrear";
import FormEditar from "./FormEditar";
import TablaProductos from "./TablaProductos";

const SeccionProductos = () => {
  const dispatch = useDispatch();
  const { colores, cepas, azucares, crianzas, elaboraciones, medidas, loading: cargandoOpciones, error: errorOpciones } = useSelector((state) => state.catalogos);
  const { itemsAdmin } = useSelector((state) => state.vinos);
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    if (colores.length === 0) dispatch(fetchCatalogos());
    if (itemsAdmin.length === 0) dispatch(fetchVinosAdmin());
  }, [dispatch]);

  const opciones = colores.length ? { colores, cepas, azucares, crianzas, elaboraciones, medidas } : null;

  const abrirNuevo = () => { setEditando(null); setMostrarForm(true); };
  const abrirEditar = (p) => { setEditando(p); setMostrarForm(true); };
  const handleGuardado = () => setMostrarForm(false);
  const handleCerrar = () => setMostrarForm(false);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={abrirNuevo}
          disabled={!opciones || !!errorOpciones}
          title={errorOpciones ? "No se pudieron cargar las opciones del formulario" : undefined}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: (!opciones || !!errorOpciones) ? "not-allowed" : "pointer", opacity: (!opciones || !!errorOpciones) ? 0.5 : 1 }}
        >
          {cargandoOpciones ? "Cargando..." : "+ Nuevo producto"}
        </button>
      </div>

      {mostrarForm && !editando && (
        <FormCrear opciones={opciones} onGuardado={handleGuardado} onCerrar={handleCerrar} />
      )}

      {mostrarForm && editando && (
        <FormEditar key={editando.id} producto={editando} opciones={opciones} onGuardado={handleGuardado} onCerrar={handleCerrar} />
      )}

      <TablaProductos onEditar={abrirEditar} />
    </>
  );
};

export default SeccionProductos;
