import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVino, fetchVinos, limpiarDetalle } from "../redux/slices/vinosSlice";
import { agregarItem } from "../redux/slices/carritoSlice";
import GaleriaProducto from "../components/product/GaleriaProducto";
import InfoProducto from "../components/product/InfoProducto";
import AccionesProducto from "../components/product/AccionesProducto";
import ProductosSimilares from "../components/product/ProductosSimilares";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detalle: producto, items: todosVinos, loading: cargando, error } = useSelector((state) => state.vinos);
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const [cantidad, setCantidad] = useState(1);
  const [imagenActual, setImagenActual] = useState(null);

  const todasImagenes = useMemo(() => {
    if (!producto) return [];
    try {
      const guardadas = JSON.parse(localStorage.getItem(`bodega_imgs_${producto.id}`)) || [];
      return [...new Set([producto.imagen, ...guardadas])].filter(Boolean);
    } catch { return [producto.imagen].filter(Boolean); }
  }, [producto]);

  const similares = useMemo(() => {
    if (!producto) return [];
    return todosVinos
      .filter((p) => p.id !== producto.id && (p.colorId === producto.colorId || p.cepaId === producto.cepaId))
      .slice(0, 3);
  }, [producto, todosVinos]);

  useEffect(() => {
    dispatch(fetchVino(id));
    if (todosVinos.length === 0) dispatch(fetchVinos());
    return () => dispatch(limpiarDetalle());
  }, [id, dispatch]);

  if (cargando || (!producto && !error)) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <p style={{ color: "var(--gray)", fontSize: "16px" }}>Cargando...</p>
    </div>
  );

  if (!producto) return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "16px" }}>
        Producto no encontrado
      </p>
      <Link to="/productos" style={{ color: "var(--primary)", fontSize: "14px" }}>
        Volver al catálogo
      </Link>
    </div>
  );

  const imagenMostrada = imagenActual || producto.imagen;
  const precioFinal = producto.discountPercent > 0
    ? producto.price * (1 - producto.discountPercent / 100)
    : producto.price;

  const agregarAlCarrito = () => {
    if (!usuario) { navigate("/login"); return; }
    dispatch(agregarItem({ producto, cantidad }));
    toast.success(`${producto.name} agregado al carrito`, { toastId: `agregar-${producto.id}` });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "32px", letterSpacing: "0.5px" }}>
        <Link to="/productos" style={{ color: "var(--gray)", textDecoration: "none" }}>Catálogo</Link>
        {" / "}
        <span style={{ color: "var(--neutral)" }}>{producto.name}</span>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
        <GaleriaProducto
          imagenMostrada={imagenMostrada}
          todasImagenes={todasImagenes}
          onSeleccionar={setImagenActual}
          discountPercent={producto.discountPercent}
          stock={producto.stock}
          nombre={producto.name}
        />
        <div>
          <InfoProducto producto={producto} precioFinal={precioFinal} />
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
  );
};

export default ProductDetail;
