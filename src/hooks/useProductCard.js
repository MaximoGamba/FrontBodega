import { useSelector } from "react-redux";
import { calcularPrecioFinal } from "../utils/formatters";
import { ROL_ADMIN } from "../utils/roles";
import useAgregarAlCarrito from "./useAgregarAlCarrito";

const useProductCard = (producto) => {
  // Selectores granulares: evitan re-renders por campos irrelevantes del store
  const esAdmin = useSelector((state) => state.auth.usuario?.rol === ROL_ADMIN);
  const enCarrito = useSelector(
    (state) => state.carrito.items.find((i) => i.id === producto.id)?.cantidad ?? 0
  );

  const sinDisponible = producto.stock === 0 || enCarrito >= producto.stock;
  const precioFinal = calcularPrecioFinal(producto.price, producto.discountPercent);
  const agregarAlCarrito = useAgregarAlCarrito(producto, 1);

  return { esAdmin, sinDisponible, precioFinal, enCarrito, agregarAlCarrito };
};

export default useProductCard;
