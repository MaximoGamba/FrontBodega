import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidosAdmin, selectAllPedidos } from "@/redux/pedidosSlice";

const PEDIDOS_TTL = 5 * 60 * 1000;

const usePedidosAdmin = () => {
  const dispatch  = useDispatch();
  const pedidos   = useSelector(selectAllPedidos);
  const status    = useSelector((state) => state.pedidos.status);
  const statusAt  = useSelector((state) => state.pedidos.statusAt);
  const error     = useSelector((state) => state.pedidos.error);

  useEffect(() => {
    if (status === "idle") { dispatch(getPedidosAdmin()); return; }
    if (status === "succeeded" && statusAt && Date.now() - statusAt > PEDIDOS_TTL) {
      dispatch(getPedidosAdmin());
    }
  }, [dispatch, status, statusAt]);

  return {
    pedidos,
    cargando: status === "loading",
    error,
  };
};

export default usePedidosAdmin;
