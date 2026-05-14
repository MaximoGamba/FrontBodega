import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchVinos } from "../services/api";

const unicos = (vinos, idKey, nombreKey) => {
  const map = new Map();
  vinos.forEach((v) => {
    if (v[idKey] && !map.has(v[idKey])) {
      map.set(v[idKey], { id: v[idKey], nombre: v[nombreKey] });
    }
  });
  return [...map.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
};

const Products = () => {
  const [todos, setTodos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("q") || "";
  const [orden, setOrden] = useState("");
  const [filtros, setFiltros] = useState({
    colorId: [],
    cepaId: [],
    azucarId: [],
    crianzaId: [],
    elaboracionId: [],
    medidaId: [],
    precioMin: 0,
    precioMax: 100000,
  });

  useEffect(() => {
    fetchVinos()
      .then((data) => {
        setTodos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los productos.");
        setCargando(false);
      });
  }, []);

  const colores = useMemo(() => unicos(todos, "colorId", "colorNombre"), [todos]);
  const cepas = useMemo(() => unicos(todos, "cepaId", "cepaNombre"), [todos]);
  const azucares = useMemo(() => unicos(todos, "azucarId", "azucarNombre"), [todos]);
  const crianzas = useMemo(() => unicos(todos, "crianzaId", "crianzaNombre"), [todos]);
  const elaboraciones = useMemo(() => unicos(todos, "elaboracionId", "elaboracionNombre"), [todos]);
  const medidas = useMemo(() => unicos(todos, "medidaId", "medidaNombre"), [todos]);

  const handleCheckbox = (campo, valor) => {
    const actual = filtros[campo];
    const num = Number(valor);
    setFiltros({ ...filtros, [campo]: actual.includes(num) ? actual.filter((v) => v !== num) : [...actual, num] });
  };

  const limpiarFiltros = () => {
    setFiltros({ colorId: [], cepaId: [], azucarId: [], crianzaId: [], elaboracionId: [], medidaId: [], precioMin: 0, precioMax: 100000 });
  };

  const productosFiltrados = todos.filter((p) => {
    if (busqueda) {
      const q = busqueda.toLowerCase();
      const coincide = [p.name, p.winery, p.colorNombre, p.cepaNombre, p.azucarNombre, p.crianzaNombre, p.elaboracionNombre, p.medidaNombre, String(p.year)]
        .some((campo) => campo?.toLowerCase().includes(q));
      if (!coincide) return false;
    }
    if (filtros.colorId.length && !filtros.colorId.includes(p.colorId)) return false;
    if (filtros.cepaId.length && !filtros.cepaId.includes(p.cepaId)) return false;
    if (filtros.azucarId.length && !filtros.azucarId.includes(p.azucarId)) return false;
    if (filtros.crianzaId.length && !filtros.crianzaId.includes(p.crianzaId)) return false;
    if (filtros.elaboracionId.length && !filtros.elaboracionId.includes(p.elaboracionId)) return false;
    if (filtros.medidaId.length && !filtros.medidaId.includes(p.medidaId)) return false;
    if (p.price < filtros.precioMin || p.price > filtros.precioMax) return false;
    return true;
  });

  const ordenar = (lista) => {
    const c = [...lista];
    if (orden === "precio-asc") return c.sort((a, b) => a.price - b.price);
    if (orden === "precio-desc") return c.sort((a, b) => b.price - a.price);
    if (orden === "nuevo") return c.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    if (orden === "antiguo") return c.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    return c;
  };

  const checkboxStyle = { accentColor: "var(--primary)", width: "16px", height: "16px" };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "260px", minWidth: "260px", borderRight: "1px solid var(--border)", padding: "32px 24px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "24px" }}>
          Filtrar por
        </p>

        {[
          { label: "Color", campo: "colorId", opciones: colores },
          { label: "Cepa", campo: "cepaId", opciones: cepas },
          { label: "Azúcar", campo: "azucarId", opciones: azucares },
          { label: "Crianza", campo: "crianzaId", opciones: crianzas },
          { label: "Elaboración", campo: "elaboracionId", opciones: elaboraciones },
          { label: "Medida", campo: "medidaId", opciones: medidas },
        ].map(({ label, campo, opciones }) => (
          opciones.length > 0 && (
            <div key={campo} style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
                {label}
              </p>
              {opciones.map((op) => (
                <label key={op.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", cursor: "pointer", fontSize: "14px" }}>
                  <input
                    type="checkbox"
                    value={op.id}
                    checked={filtros[campo].includes(op.id)}
                    onChange={(e) => handleCheckbox(campo, e.target.value)}
                    style={checkboxStyle}
                  />
                  {op.nombre}
                </label>
              ))}
            </div>
          )
        ))}

        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>
            Rango de precio
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>
            <span>${filtros.precioMin.toLocaleString()}</span>
            <span>${filtros.precioMax.toLocaleString()}</span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>Desde</p>
          <input
            type="range" min={0} max={100000} value={filtros.precioMin}
            onChange={(e) => setFiltros({ ...filtros, precioMin: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "var(--primary)" }}
          />
          <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>Hasta</p>
          <input
            type="range" min={0} max={100000} value={filtros.precioMax}
            onChange={(e) => setFiltros({ ...filtros, precioMax: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "var(--primary)" }}
          />
        </div>

        <button onClick={limpiarFiltros} style={{ width: "100%", background: "var(--primary)", color: "white", border: "none", padding: "12px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}>
          Limpiar filtros
        </button>
      </aside>

      <main style={{ flex: 1, padding: "32px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>
            {busqueda ? `Buscando resultados para: "${busqueda}"` : "Catálogo de Vinos"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "var(--gray)" }}>{productosFiltrados.length} resultados</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={{ border: "1px solid var(--border)", padding: "6px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", background: "white", cursor: "pointer" }}
            >
              <option value="">Ordenar por</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nuevo">Más reciente</option>
              <option value="antiguo">Más antiguo</option>
            </select>
          </div>
        </div>

        {cargando && (
          <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
            Cargando productos...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", color: "var(--primary)", marginTop: "60px", fontSize: "16px" }}>
            {error}
          </p>
        )}

        {!cargando && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {ordenar(productosFiltrados).map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}

        {!cargando && !error && productosFiltrados.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
            No hay vinos que coincidan con los filtros seleccionados.
          </p>
        )}
      </main>
    </div>
  );
};

export default Products;
