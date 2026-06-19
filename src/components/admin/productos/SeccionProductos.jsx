import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setProductoEditando, cerrarFormProducto } from "@/redux/adminUISlice";
import { selectVinoAdminById } from "@/redux/vinosSlice";
import useCatalogos from "../../../hooks/useCatalogos";
import FormProducto from "./FormProducto";
import TablaProductos from "./TablaProductos";

const SeccionProductos = () => {
  const dispatch = useDispatch();
  const { catalogos, error: errorOpciones } = useCatalogos();

  const productoEditandoId = useSelector((state) => state.adminUI.productoEditandoId);
  const mostrarForm        = useSelector((state) => state.adminUI.mostrarFormProducto);
  const editando           = useSelector((state) => selectVinoAdminById(state, productoEditandoId));

  useEffect(() => {
    if (errorOpciones) toast.error("No se pudieron cargar las opciones del formulario.", { toastId: "error-catalogos" });
  }, [errorOpciones]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
        <button
          onClick={() => dispatch(setProductoEditando(null))}
          disabled={!catalogos || !!errorOpciones}
          title={errorOpciones ? "No se pudieron cargar las opciones del formulario" : undefined}
          style={{ background: "var(--primary)", color: "white", border: "none", padding: "10px 24px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: (!catalogos || errorOpciones) ? "not-allowed" : "pointer", opacity: (!catalogos || errorOpciones) ? 0.5 : 1 }}
        >
          {!catalogos && !errorOpciones ? "Cargando..." : "+ Nuevo producto"}
        </button>
      </div>

      {mostrarForm && (
        <FormProducto
          key={productoEditandoId ?? "nuevo"}
          producto={editando}
          opciones={catalogos}
          onGuardado={() => dispatch(cerrarFormProducto())}
          onCerrar={() => dispatch(cerrarFormProducto())}
        />
      )}

      <TablaProductos onEditar={(p) => dispatch(setProductoEditando(p.id))} />
    </>
  );
};

export default SeccionProductos;
