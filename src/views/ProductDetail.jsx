import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ROL_ADMIN } from "../utils/roles";
import useVino from "../hooks/useVino";
import useVinos from "../hooks/useVinos";
import { calcularPrecioFinal } from "../utils/formatters";
import useAgregarAlCarrito from "../hooks/useAgregarAlCarrito";
import ImagenProducto from "../components/product/ImagenProducto";
import InfoProducto from "../components/product/InfoProducto";
import AccionesProducto from "../components/product/AccionesProducto";
import ProductosSimilares from "../components/product/ProductosSimilares";
import EstadoCarga from "../components/shared/EstadoCarga";

const ProductDetail = () => {
  const { id } = useParams();
  const esAdmin = useSelector((state) => state.users.usuario?.rol === ROL_ADMIN);

  const [cantidad, setCantidad] = useState(1);
  useEffect(() => { setCantidad(1); }, [id]);

  const { vino: producto, cargando, error } = useVino(id);
  const { vinos } = useVinos();

  const agregarAlCarrito = useAgregarAlCarrito(producto, cantidad);

  const similares = useMemo(() => {
    if (!producto) return [];
    return vinos
      .filter((p) => p.id !== producto.id && (p.colorId === producto.colorId || p.cepaId === producto.cepaId))
      .slice(0, 3);
  }, [producto, vinos]);

  return (
    <EstadoCarga cargando={cargando} error={error}>
      {!producto ? (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "16px" }}>
            Producto no encontrado
          </p>
          <Link to="/productos" style={{ color: "var(--primary)", fontSize: "14px" }}>
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
          <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "32px", letterSpacing: "0.5px" }}>
            <Link to="/productos" style={{ color: "var(--gray)", textDecoration: "none" }}>Catálogo</Link>
            {" / "}
            <span style={{ color: "var(--neutral)" }}>{producto.name}</span>
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <ImagenProducto
              imagenMostrada={producto.imagen}
              discountPercent={producto.discountPercent}
              stock={producto.stock}
              nombre={producto.name}
            />
            <div>
              <InfoProducto producto={producto} precioFinal={calcularPrecioFinal(producto.price, producto.discountPercent)} />
              <AccionesProducto
                producto={producto}
                cantidad={cantidad}
                onCantidad={setCantidad}
                onAgregar={agregarAlCarrito}
                esAdmin={esAdmin}
              />
            </div>
          </div>

          <ProductosSimilares similares={similares} />
        </div>
      )}
    </EstadoCarga>
  );
};

export default ProductDetail;
