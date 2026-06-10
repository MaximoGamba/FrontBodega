import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { calcularPrecioFinal } from "../utils/formatters";
import useAgregarAlCarrito from "./useAgregarAlCarrito";

const useProductCard = (producto) => {
  const { carrito } = useCart();
  const { usuario } = useAuth();

  const esAdmin = usuario?.rol === "admin";
  const enCarrito = carrito.find((i) => i.id === producto.id)?.cantidad ?? 0;
  const sinDisponible = producto.stock === 0 || enCarrito >= producto.stock;
  const precioFinal = calcularPrecioFinal(producto.price, producto.discountPercent);
  const agregarAlCarrito = useAgregarAlCarrito(producto, 1);

  return { esAdmin, sinDisponible, precioFinal, enCarrito, agregarAlCarrito };
};

export default useProductCard;
