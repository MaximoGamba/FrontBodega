import { useState } from "react";
import { productosIniciales, colores, cepas, azucares, crianzas, elaboraciones, medidas } from "../data/productos";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [productos] = useState(productosIniciales);
  const [filtros, setFiltros] = useState({
    colorId: [],
    cepaId: [],
    azucarId: [],
    crianzaId: [],
    elaboracionId: [],
    medidaId: [],
    precioMin: 0,
    precioMax: 10000,
  });

  const handleCheckbox = (campo, valor) => {
    const actual = filtros[campo];
    const num = Number(valor);
    if (actual.includes(num)) {
      setFiltros({ ...filtros, [campo]: actual.filter((v) => v !== num) });
    } else {
      setFiltros({ ...filtros, [campo]: [...actual, num] });
    }
  };

  const limpiarFiltros = () => {
    setFiltros({ colorId: [], cepaId: [], azucarId: [], crianzaId: [], elaboracionId: [], medidaId: [], precioMin: 0, precioMax: 10000 });
  };

  const productosFiltrados = productos.filter((p) => {
    if (filtros.colorId.length && !filtros.colorId.includes(p.colorId)) return false;
    if (filtros.cepaId.length && !filtros.cepaId.includes(p.cepaId)) return false;
    if (filtros.azucarId.length && !filtros.azucarId.includes(p.azucarId)) return false;
    if (filtros.crianzaId.length && !filtros.crianzaId.includes(p.crianzaId)) return false;
    if (filtros.elaboracionId.length && !filtros.elaboracionId.includes(p.elaboracionId)) return false;
    if (filtros.medidaId.length && !filtros.medidaId.includes(p.medidaId)) return false;
    if (p.price < filtros.precioMin || p.price > filtros.precioMax) return false;
    return true;
  });

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
            type="range"
            min={0}
            max={10000}
            value={filtros.precioMin}
            onChange={(e) => setFiltros({ ...filtros, precioMin: Number(e.target.value) })}
            style={{ width: "100%", accentColor: "var(--primary)" }}
          />
          <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "4px" }}>Hasta</p>
          <input
            type="range"
            min={0}
            max={10000}
            value={filtros.precioMax}
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
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px" }}>Catálogo de Vinos</h1>
          <span style={{ fontSize: "13px", color: "var(--gray)" }}>{productosFiltrados.length} resultados</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              colores={colores}
              cepas={cepas}
            />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
            No hay vinos que coincidan con los filtros seleccionados.
          </p>
        )}
      </main>
    </div>
  );
};

export default Products;
