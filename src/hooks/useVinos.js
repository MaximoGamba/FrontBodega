import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVinos, selectAllVinos } from "@/redux/vinosSlice";

const VINOS_TTL = 5 * 60 * 1000;

const useVinos = () => {
  const dispatch  = useDispatch();
  const vinos    = useSelector(selectAllVinos);
  const status   = useSelector((state) => state.vinos.public.status);
  const statusAt = useSelector((state) => state.vinos.public.statusAt);
  const error    = useSelector((state) => state.vinos.public.error);

  useEffect(() => {
    if (status === "idle") { dispatch(getVinos()); return; }
    if (status === "succeeded" && statusAt && Date.now() - statusAt > VINOS_TTL) {
      dispatch(getVinos());
    }
  }, [dispatch, status, statusAt]);

  return { vinos, cargando: status === "loading", error };
};

export default useVinos;
