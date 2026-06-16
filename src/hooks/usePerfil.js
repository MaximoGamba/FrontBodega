import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario, getPedidosUsuario } from "@/redux/usuarioSlice";

const PERFIL_TTL = 5 * 60 * 1000;

const usePerfil = (userId, esAdmin) => {
  const dispatch = useDispatch();
  const datos         = useSelector((state) => state.usuario.datos);
  const status        = useSelector((state) => state.usuario.statusDatos);
  const statusAt      = useSelector((state) => state.usuario.statusAt);
  // usuarioSlice.pedidos = historial del usuario logueado; pedidosSlice = todos los pedidos (solo admin)
  const pedidos       = useSelector((state) => state.usuario.pedidos);
  const statusPedidos = useSelector((state) => state.usuario.statusPedidos);

  useEffect(() => {
    if (!userId) return;
    if (status === "idle") { dispatch(getUsuario(userId)); return; }
    if (status === "succeeded" && statusAt && Date.now() - statusAt > PERFIL_TTL) {
      dispatch(getUsuario(userId));
    }
  }, [dispatch, userId, status, statusAt]);

  useEffect(() => {
    if (!userId || esAdmin || statusPedidos !== "idle") return;
    dispatch(getPedidosUsuario(userId));
  }, [dispatch, userId, esAdmin, statusPedidos]);

  return { perfil: datos, pedidos, cargando: status === "loading" };
};

export default usePerfil;
