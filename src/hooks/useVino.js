import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVinoById, selectVinoById } from "@/redux/vinosSlice";

const useVino = (id) => {
  const dispatch      = useDispatch();
  const vino          = useSelector((state) => selectVinoById(state, id));
  const statusActual = useSelector((state) => state.vinos.statusActual);
  const error        = useSelector((state) => state.vinos.errorActual);

  useEffect(() => {
    // Solo fetcha si el vino no está ya en el adapter (e.g. vino previo de getVinos)
    if (id && !vino) dispatch(getVinoById(id));
  }, [dispatch, id, vino]);

  return { vino, cargando: statusActual === "loading" || (!vino && statusActual !== "failed"), error };
};

export default useVino;
