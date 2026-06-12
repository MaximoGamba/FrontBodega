import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { agregarItem } from "../../redux/slices/carritoSlice";
import { toast } from "react-toastify";

const ProductCard = ({ producto }) => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const carrito = useSelector((state) => state.carrito.items);
  const navigate = useNavigate();
  const esAdmin = usuario?.rol === "admin";
  const enCarrito = carrito.find((i) => i.id === producto.id)?.cantidad ?? 0;
  const sinDisponible = producto.stock === 0 || enCarrito >= producto.stock;

  const precioFinal = producto.discountPercent > 0
    ? producto.price * (1 - producto.discountPercent / 100)
    : producto.price;

  const agregarAlCarrito = () => {
    if (!usuario) { navigate("/login"); return; }
    dispatch(agregarItem({ producto, cantidad: 1 }));
    toast.success(`${producto.name} agregado al carrito`, { toastId: `agregar-${producto.id}` });
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Link to={`/productos/${producto.id}`}>
        <div style={{ position: "relative", marginBottom: "12px", overflow: "hidden", background: "#ffffff" }}>
          <img
            src={producto.imagen}
            alt={producto.name}
            style={{ width: "100%", height: "320px", objectFit: "contain", padding: "12px" }}
          />
          {producto.stock === 0 && (
            <span style={{ position: "absolute", top: "12px", right: "12px", background: "var(--primary-dark)", color: "white", fontSize: "11px", padding: "4px 10px", letterSpacing: "1px" }}>
              Sin stock
            </span>
          )}
          {producto.discountPercent > 0 && (
            <span style={{ position: "absolute", top: "12px", left: "12px", background: "var(--primary)", color: "white", fontSize: "11px", padding: "4px 10px", letterSpacing: "1px" }}>
              -{producto.discountPercent}%
            </span>
          )}
        </div>
        <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gray)", marginBottom: "4px" }}>
          {producto.colorNombre} · {producto.cepaNombre}
        </p>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "16px", marginBottom: "4px" }}>
          {producto.name}
        </h3>
        <p style={{ fontSize: "14px", color: "var(--neutral)" }}>
          {producto.discountPercent > 0 && (
            <span style={{ textDecoration: "line-through", color: "var(--gray)", marginRight: "8px" }}>
              ${producto.price.toLocaleString()}
            </span>
          )}
          ${precioFinal.toLocaleString()}
        </p>
      </Link>
      {!esAdmin && (
        <button
          onClick={agregarAlCarrito}
          disabled={sinDisponible}
          style={{
            marginTop: "8px", width: "100%", border: "none", padding: "10px",
            fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase",
            background: sinDisponible ? "var(--primary-dark)" : "var(--primary)",
            color: "white",
            cursor: sinDisponible ? "not-allowed" : "pointer",
            opacity: sinDisponible ? 0.7 : 1,
          }}
        >
          {producto.stock === 0 ? "Sin stock" : enCarrito >= producto.stock ? "Máximo alcanzado" : "Agregar"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
