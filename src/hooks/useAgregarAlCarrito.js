import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { agregarItem } from "@/redux/carritoSlice";

const useAgregarAlCarrito = (producto, cantidad = 1) => {
  const dispatch = useDispatch();
  // Selector granular: solo necesitamos saber si hay usuario, no todos sus datos
  const estaLogueado = useSelector((state) => state.users.usuario !== null);
  const navigate = useNavigate();

  const agregar = () => {
    if (!estaLogueado) { navigate("/login"); return; }
    dispatch(agregarItem({ producto, cantidad }));
    toast.success(`${producto.name} agregado al carrito`, { toastId: `agregar-${producto.id}` });
  };

  return agregar;
};

export default useAgregarAlCarrito;
