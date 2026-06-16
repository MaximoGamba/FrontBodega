import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrdenProductos, toggleCheckbox, setPrecioFiltro, limpiarFiltros } from "@/redux/catalogoUISlice";
import { selectVinosFiltrados } from "@/redux/vinosSlice";
import useVinos from "../hooks/useVinos";
import useCatalogos from "../hooks/useCatalogos";
import FiltrosProductos from "../components/filters/FiltrosProductos";
import OrdenadorProductos from "../components/products/OrdenadorProductos";
import GrillaProductos from "../components/products/GrillaProductos";

const Products = () => {
  const dispatch = useDispatch();
  const { cargando, error } = useVinos();
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("q") || "";

  const orden   = useSelector((state) => state.catalogoUI.ordenProductos);
  const filtros = useSelector((state) => state.catalogoUI.filtros);
  const productosFiltrados = useSelector((state) => selectVinosFiltrados(state, busqueda));

  const { catalogos: rawCatalogos } = useCatalogos();
  const catalogos = rawCatalogos ? {
    colorId:       rawCatalogos.colores,
    cepaId:        rawCatalogos.cepas,
    azucarId:      rawCatalogos.azucares,
    crianzaId:     rawCatalogos.crianzas,
    elaboracionId: rawCatalogos.elaboraciones,
    medidaId:      rawCatalogos.medidas,
  } : {};

  const handleCheckbox = (campo, valor) => dispatch(toggleCheckbox({ campo, valor }));
  const handlePrecio   = (campo, valor) => dispatch(setPrecioFiltro({ campo, valor }));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <FiltrosProductos
        filtros={filtros}
        catalogos={catalogos}
        onCheckbox={handleCheckbox}
        onPrecio={handlePrecio}
        onLimpiar={() => dispatch(limpiarFiltros())}
      />
      <main style={{ flex: 1, padding: "32px 40px" }}>
        <OrdenadorProductos
          cantidad={productosFiltrados.length}
          busqueda={busqueda}
          orden={orden}
          onOrden={(val) => dispatch(setOrdenProductos(val))}
        />
        <GrillaProductos
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
        />
      </main>
    </div>
  );
};

export default Products;
