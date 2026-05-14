import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import { fetchVino, fetchVinos } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const { setCarrito } = useCart();
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === "admin";
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    setSimilares([]);
    fetchVino(id)
      .then((data) => {
        setProducto(data);
        setCargando(false);
        return fetchVinos();
      })
      .then((todos) => {
        setSimilares(
          todos
            .filter((p) => p.id !== Number(id) && (p.colorId === producto?.colorId || p.cepaId === producto?.cepaId))
            .slice(0, 3)
        );
      })
      .catch(() => setCargando(false));
  }, [id]);

  useEffect(() => {
    if (producto) {
      fetchVinos().then((todos) => {
        setSimilares(
          todos
            .filter((p) => p.id !== producto.id && (p.colorId === producto.colorId || p.cepaId === producto.cepaId))
            .slice(0, 3)
        );
      });
    }
  }, [producto]);

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

  const precioFinal =
    producto.discountPercent > 0
      ? producto.price * (1 - producto.discountPercent / 100)
      : producto.price;

  const agregarAlCarrito = () => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
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
        <div style={{ position: "relative" }}>
          <img
            src={producto.imagen}
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
