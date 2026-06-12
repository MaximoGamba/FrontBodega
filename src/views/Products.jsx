import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVinos } from "../redux/slices/vinosSlice";
import FiltrosProductos from "../components/filters/FiltrosProductos";
import OrdenadorProductos from "../components/products/OrdenadorProductos";
import GrillaProductos from "../components/products/GrillaProductos";

const unicos = (vinos, idKey, nombreKey) => {
  const map = new Map();
  vinos.forEach((v) => {
    if (v[idKey] && !map.has(v[idKey]))
      map.set(v[idKey], { id: v[idKey], nombre: v[nombreKey] });
  });
  return [...map.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
};

const FILTROS_INICIALES = {
  colorId: [], cepaId: [], azucarId: [], crianzaId: [],
  elaboracionId: [], medidaId: [], precioMin: 0, precioMax: 100000,
};

const Products = () => {
  const dispatch = useDispatch();
  const { items: todos, loading: cargando, error } = useSelector((state) => state.vinos);
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("q") || "";
  const [orden, setOrden] = useState("");
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  useEffect(() => {
    if (todos.length === 0) dispatch(fetchVinos());
  }, [dispatch]);

  const catalogos = useMemo(() => ({
    colorId:       unicos(todos, "colorId",       "colorNombre"),
    cepaId:        unicos(todos, "cepaId",         "cepaNombre"),
    azucarId:      unicos(todos, "azucarId",       "azucarNombre"),
    crianzaId:     unicos(todos, "crianzaId",      "crianzaNombre"),
    elaboracionId: unicos(todos, "elaboracionId",  "elaboracionNombre"),
    medidaId:      unicos(todos, "medidaId",       "medidaNombre"),
  }), [todos]);

  const handleCheckbox = (campo, valor) => {
    const num = Number(valor);
    const actual = filtros[campo];
    setFiltros({ ...filtros, [campo]: actual.includes(num) ? actual.filter((v) => v !== num) : [...actual, num] });
  };

  const handlePrecio = (campo, valor) => setFiltros({ ...filtros, [campo]: valor });

  const limpiarFiltros = () => setFiltros(FILTROS_INICIALES);

  const productosFiltrados = todos.filter((p) => {
    if (busqueda) {
      const q = busqueda.toLowerCase();
      const coincide = [p.name, p.winery, p.colorNombre, p.cepaNombre, p.azucarNombre, p.crianzaNombre, p.elaboracionNombre, p.medidaNombre, String(p.year)]
        .some((c) => c?.toLowerCase().includes(q));
      if (!coincide) return false;
    }
    if (filtros.colorId.length       && !filtros.colorId.includes(p.colorId))             return false;
    if (filtros.cepaId.length        && !filtros.cepaId.includes(p.cepaId))               return false;
    if (filtros.azucarId.length      && !filtros.azucarId.includes(p.azucarId))           return false;
    if (filtros.crianzaId.length     && !filtros.crianzaId.includes(p.crianzaId))         return false;
    if (filtros.elaboracionId.length && !filtros.elaboracionId.includes(p.elaboracionId)) return false;
    if (filtros.medidaId.length      && !filtros.medidaId.includes(p.medidaId))           return false;
    const precioFinal = p.discountPercent > 0 ? p.price * (1 - p.discountPercent / 100) : p.price;
    if (precioFinal < filtros.precioMin || precioFinal > filtros.precioMax) return false;
    return true;
  });

  const ordenar = (lista) => {
    const c = [...lista];
    if (orden === "precio-asc")  c.sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") c.sort((a, b) => b.price - a.price);
    if (orden === "nuevo")       c.sort((a, b) => b.id - a.id);
    if (orden === "antiguo")     c.sort((a, b) => a.id - b.id);
    return c.sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <FiltrosProductos
        filtros={filtros}
        catalogos={catalogos}
        onCheckbox={handleCheckbox}
        onPrecio={handlePrecio}
        onLimpiar={limpiarFiltros}
      />
      <main style={{ flex: 1, padding: "32px 40px" }}>
        <OrdenadorProductos
          cantidad={productosFiltrados.length}
          busqueda={busqueda}
          orden={orden}
          onOrden={setOrden}
        />
        <GrillaProductos
          productos={ordenar(productosFiltrados)}
          cargando={cargando}
          error={error}
        />
      </main>
    </div>
  );
};

export default Products;
