import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const useAgregarAlCarrito = (producto, cantidad = 1) => {
  const { agregarItem } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const agregar = () => {
    if (!usuario) { navigate("/login"); return; }
    agregarItem(producto, cantidad);
    toast.success(`${producto.name} agregado al carrito`, { toastId: `agregar-${producto.id}` });
  };

  return agregar;
};

export default useAgregarAlCarrito;
