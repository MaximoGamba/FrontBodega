import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario, getPedidosUsuario } from "@/redux/usuarioSlice";

const usePerfil = (userId, esAdmin) => {
  const dispatch = useDispatch();
  const datos         = useSelector((state) => state.usuario.datos);
  const status        = useSelector((state) => state.usuario.statusDatos);
  // usuarioSlice.pedidos = historial del usuario logueado; pedidosSlice = todos los pedidos (solo admin)
  const pedidos       = useSelector((state) => state.usuario.pedidos);
  const statusPedidos = useSelector((state) => state.usuario.statusPedidos);

  useEffect(() => {
    if (!userId || status !== "idle") return;
    dispatch(getUsuario(userId));
  }, [dispatch, userId, status]);

  useEffect(() => {
    if (!userId || esAdmin || statusPedidos !== "idle") return;
    dispatch(getPedidosUsuario(userId));
  }, [dispatch, userId, esAdmin, statusPedidos]);

  return { perfil: datos, pedidos, cargando: status === "loading" };
};

export default usePerfil;
