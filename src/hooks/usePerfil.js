import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario, putUsuario, getPedidosUsuario } from "@/redux/usuarioSlice";

const usePerfil = (userId, esAdmin) => {
  const dispatch = useDispatch();
  const datos         = useSelector((state) => state.usuario.datos);
  const loading       = useSelector((state) => state.usuario.loading);
  // usuarioSlice.pedidos = historial del usuario logueado; pedidosSlice = todos los pedidos (solo admin)
  const pedidos       = useSelector((state) => state.usuario.pedidos);
  const statusPedidos = useSelector((state) => state.usuario.statusPedidos);

  useEffect(() => {
    if (!userId) return;
    dispatch(getUsuario(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId || esAdmin || statusPedidos !== "idle") return;
    dispatch(getPedidosUsuario(userId));
  }, [dispatch, userId, esAdmin, statusPedidos]);

  const actualizarPerfil = (cambios) => {
    dispatch(putUsuario({ userId, datos: cambios }));
  };

  return { perfil: datos, pedidos, cargando: loading, actualizarPerfil };
};

export default usePerfil;
