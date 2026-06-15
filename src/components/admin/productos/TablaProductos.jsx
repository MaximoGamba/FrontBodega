import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaginaAdmin } from "@/redux/adminUISlice";
import useVinosAdmin from "../../../hooks/useVinosAdmin";
import { estaActivo } from "../../../services/vinosService";
import EstadoCarga from "../../shared/EstadoCarga";
import Boton from "../../shared/Boton";
import BotonToggle from "./BotonToggle";

const ITEMS_POR_PAGINA = 10;

const TablaProductos = ({ onEditar }) => {
  const dispatch = useDispatch();
  const { productos, cargando, error, actualizarActivo } = useVinosAdmin();
  const pagina = useSelector((state) => state.adminUI.paginaAdmin);

  useEffect(() => {
    dispatch(setPaginaAdmin(1));
  }, [dispatch]);

  const totalPaginas    = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const productosPagina = productos.slice((pagina - 1) * ITEMS_POR_PAGINA, pagina * ITEMS_POR_PAGINA);

  return (
    <EstadoCarga cargando={cargando} error={error}>
      {productos.length === 0 ? (
        <p style={{ color: "var(--gray)", textAlign: "center", padding: "40px", fontSize: "14px" }}>
          No hay productos cargados.
        </p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", textAlign: "left" }}>
                {["Nombre", "Bodega", "Precio", "Stock", "Descuento", "Estado", ""].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", fontWeight: "600" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productosPagina.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px" }}>{p.name}</td>
                  <td style={{ padding: "12px", color: "var(--gray)" }}>{p.winery}</td>
                  <td style={{ padding: "12px" }}>${Number(p.price).toLocaleString()}</td>
                  <td style={{ padding: "12px" }}>
                    {p.stock <= 5 ? <span className="stock-bajo">{p.stock}</span> : p.stock}
                  </td>
                  <td style={{ padding: "12px" }}>{p.discountPercent > 0 ? `${p.discountPercent}%` : "—"}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ fontSize: "11px", padding: "3px 10px", background: estaActivo(p) ? "#e6f4ea" : "#fce8e8", color: estaActivo(p) ? "#2d7a2d" : "#c0392b" }}>
                      {estaActivo(p) ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                    <Boton variante="secundario" tamaño="sm" onClick={() => onEditar(p)}>Editar</Boton>
                    <BotonToggle producto={p} onActualizado={actualizarActivo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPaginas > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
              <Boton variante="secundario" tamaño="sm" disabled={pagina === 1} onClick={() => dispatch(setPaginaAdmin(pagina - 1))}>
                Anterior
              </Boton>
              <span style={{ fontSize: "12px", color: "var(--gray)", letterSpacing: "1px" }}>
                {pagina} / {totalPaginas}
              </span>
              <Boton variante="secundario" tamaño="sm" disabled={pagina === totalPaginas} onClick={() => dispatch(setPaginaAdmin(pagina + 1))}>
                Siguiente
              </Boton>
            </div>
          )}
        </>
      )}
    </EstadoCarga>
  );
};

export default TablaProductos;
