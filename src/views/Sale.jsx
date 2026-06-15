import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrdenSale } from "@/redux/catalogoUISlice";
import useVinos from "../hooks/useVinos";
import { ordenarProductos } from "../utils/productosSort";
import { estaActivo } from "../services/vinosService";
import ProductCard from "../components/product/ProductCard";
import EstadoCarga from "../components/shared/EstadoCarga";

const Sale = () => {
  const dispatch = useDispatch();
  const { vinos, cargando, error } = useVinos();
  const orden = useSelector((state) => state.catalogoUI.ordenSale);

  const enOferta = useMemo(() => vinos.filter((p) => p.discountPercent > 0 && estaActivo(p)), [vinos]);
  const ordenados = useMemo(() => ordenarProductos(enOferta, orden), [enOferta, orden]);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", borderBottom: "2px solid var(--primary)", paddingBottom: "16px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "8px" }}>Ofertas</h1>
          <p style={{ fontSize: "13px", color: "var(--gray)" }}>
            {cargando ? "Cargando..." : `${enOferta.length} productos con descuento`}
          </p>
        </div>
        <select
          value={orden}
          onChange={(e) => dispatch(setOrdenSale(e.target.value))}
          style={{ border: "1px solid var(--border)", padding: "6px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", background: "white", cursor: "pointer" }}
        >
          <option value="">Ordenar por</option>
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
          <option value="nuevo">Más reciente</option>
          <option value="antiguo">Más antiguo</option>
        </select>
      </div>

      <EstadoCarga cargando={cargando} error={error}>
        {ordenados.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--gray)", marginTop: "60px", fontSize: "16px" }}>
            No hay productos en oferta por el momento.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {ordenados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </EstadoCarga>
    </div>
  );
};

export default Sale;
