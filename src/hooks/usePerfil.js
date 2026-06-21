import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuario } from "@/redux/usersSlice";
import { getPedidosUsuario } from "@/redux/pedidosSlice";
import { ROL_ADMIN } from "@/utils/roles";

const PERFIL_TTL = 5 * 60 * 1000;

const usePerfil = (userId) => {
  const dispatch = useDispatch();
  const esAdmin       = useSelector((state) => state.users.usuario?.rol === ROL_ADMIN);
  const datos         = useSelector((state) => state.users.datos);
  const status        = useSelector((state) => state.users.statusDatos);
  const statusAt      = useSelector((state) => state.users.statusAt);
  const errorDatos    = useSelector((state) => state.users.errorDatos);
  const pedidos       = useSelector((state) => state.pedidos.propios.items);
  const statusPedidos = useSelector((state) => state.pedidos.propios.status);
  const errorPedidos  = useSelector((state) => state.pedidos.propios.error);

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

  return {
    perfil:          datos,
    pedidos,
    cargando:        status === "loading",
    cargandoPedidos: statusPedidos === "loading",
    errorPedidos:    statusPedidos === "failed" ? errorPedidos : null,
    errorPerfil:     status === "failed" ? errorDatos : null,
  };
};

export default usePerfil;
