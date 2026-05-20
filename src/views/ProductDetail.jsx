import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { fetchVino, fetchVinos } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const { agregarItem } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [imagenActual, setImagenActual] = useState(null);

  const todasImagenes = useMemo(() => {
    if (!producto) return [];
    try {
      const guardadas = JSON.parse(localStorage.getItem(`bodega_imgs_${producto.id}`)) || [];
      return [...new Set([producto.imagen, ...guardadas])].filter(Boolean);
    } catch { return [producto.imagen].filter(Boolean); }
  }, [producto]);

  useEffect(() => {
    setCargando(true);
    setSimilares([]);
    let cancelado = false;
    Promise.all([fetchVino(id), fetchVinos()])
      .then(([data, todos]) => {
        if (cancelado) return;
        setProducto(data);
        setCargando(false);
        setSimilares(
          todos
            .filter((p) => p.id !== data.id && (p.colorId === data.colorId || p.cepaId === data.cepaId))
            .slice(0, 3)
        );
      })
      .catch(() => { if (!cancelado) setCargando(false); });
    return () => { cancelado = true; };
  }, [id]);

  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ color: "var(--gray)", fontSize: "16px" }}>Cargando...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "16px" }}>
          Producto no encontrado
        </p>
        <Link to="/productos" style={{ color: "var(--primary)", fontSize: "14px" }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const imagenMostrada = imagenActual || producto.imagen;

  const precioFinal =
    producto.discountPercent > 0
      ? producto.price * (1 - producto.discountPercent / 100)
      : producto.price;

  const agregarAlCarrito = () => {
    if (!usuario) { navigate("/login"); return; }
    agregarItem(producto, cantidad);
    toast.success(`${producto.name} agregado al carrito`, { toastId: `agregar-${producto.id}` });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "32px", letterSpacing: "0.5px" }}>
        <Link to="/productos" style={{ color: "var(--gray)", textDecoration: "none" }}>
          Catálogo
        </Link>
        {" / "}
        <span style={{ color: "var(--neutral)" }}>{producto.name}</span>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
        {/* Imagen */}
        <div>
          <div style={{ position: "relative" }}>
            <img
              src={imagenMostrada}
              alt={producto.name}
              style={{ width: "100%", maxHeight: "560px", objectFit: "cover" }}
            />
            {producto.discountPercent > 0 && (
              <span style={{ position: "absolute", top: "16px", left: "16px", background: "var(--primary)", color: "white", fontSize: "12px", padding: "6px 12px", letterSpacing: "1px" }}>
                -{producto.discountPercent}%
              </span>
            )}
            {producto.stock === 0 && (
              <span style={{ position: "absolute", top: "16px", right: "16px", background: "var(--primary-dark)", color: "white", fontSize: "12px", padding: "6px 12px", letterSpacing: "1px" }}>
                Sin stock
              </span>
            )}
          </div>
          {todasImagenes.length > 1 && (
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {todasImagenes.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt=""
                  onClick={() => setImagenActual(url)}
                  style={{ width: "60px", height: "60px", objectFit: "cover", cursor: "pointer", border: imagenMostrada === url ? "2px solid var(--primary)" : "2px solid transparent", opacity: imagenMostrada === url ? 1 : 0.65 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "8px" }}>
            {producto.colorNombre} · {producto.cepaNombre}
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", marginBottom: "4px" }}>
            {producto.name}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--gray)", marginBottom: "24px" }}>
            {producto.winery} · {producto.year}
          </p>

          {/* Precio */}
          <div style={{ marginBottom: "28px" }}>
            {producto.discountPercent > 0 && (
              <p style={{ fontSize: "14px", color: "var(--gray)", textDecoration: "line-through", marginBottom: "4px" }}>
                ${producto.price.toLocaleString()}
              </p>
            )}
            <p style={{ fontSize: "28px", fontWeight: "600", color: "var(--neutral)" }}>
              ${precioFinal.toLocaleString()}
            </p>
          </div>

          {/* Ficha técnica */}
          <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 0", marginBottom: "28px" }}>
            {[
              { label: "Azúcar", valor: producto.azucarNombre },
              { label: "Crianza", valor: producto.crianzaNombre },
              { label: "Elaboración", valor: producto.elaboracionNombre },
              { label: "Medida", valor: producto.medidaNombre },
            ].map(({ label, valor }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px" }}>
                <span style={{ color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "11px" }}>{label}</span>
                <span style={{ color: "var(--neutral)" }}>{valor}</span>
              </div>
            ))}
          </div>

          {/* Cantidad + agregar */}
          {!esAdmin && (
            producto.stock > 0 ? (
              <div>
                <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "10px" }}>
                  Cantidad
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} style={btnCantidad}>−</button>
                  <span style={{ fontSize: "16px", minWidth: "24px", textAlign: "center" }}>{cantidad}</span>
                  <button onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))} style={btnCantidad}>+</button>
                </div>
                <button
                  onClick={agregarAlCarrito}
                  style={{ width: "100%", background: "var(--primary)", color: "white", border: "none", padding: "16px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Agregar al carrito
                </button>
              </div>
            ) : (
              <button
                disabled
                style={{ width: "100%", background: "var(--primary-dark)", color: "white", border: "none", padding: "16px", fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "not-allowed", opacity: 0.7 }}
              >
                Sin stock
              </button>
            )
          )}
        </div>
      </div>

      {/* Productos similares */}
      {similares.length > 0 && (
        <div style={{ marginTop: "64px", borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "24px", marginBottom: "32px" }}>
            Productos similares
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {similares.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const btnCantidad = {
  width: "36px",
  height: "36px",
  border: "1px solid var(--border)",
  background: "white",
  cursor: "pointer",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default ProductDetail;
