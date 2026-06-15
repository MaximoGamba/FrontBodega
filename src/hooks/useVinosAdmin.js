import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVinosAdmin, desactivarVino, reactivarVino, selectAllVinosAdmin } from "@/redux/vinosSlice";
import { sortProductos } from "../utils/productosSort";

const VINOS_ADMIN_TTL = 5 * 60 * 1000;

const useVinosAdmin = () => {
  const dispatch    = useDispatch();
  const itemsAdmin  = useSelector(selectAllVinosAdmin);
  const statusAdmin = useSelector((state) => state.vinos.admin.status);
  const statusAt    = useSelector((state) => state.vinos.admin.statusAt);
  const error       = useSelector((state) => state.vinos.admin.error);

  useEffect(() => {
    if (statusAdmin === "idle") { dispatch(getVinosAdmin()); return; }
    if (statusAdmin === "succeeded" && statusAt && Date.now() - statusAt > VINOS_ADMIN_TTL) {
      dispatch(getVinosAdmin());
    }
  }, [dispatch, statusAdmin, statusAt]);

  const productos = useMemo(() => sortProductos(itemsAdmin), [itemsAdmin]);

  const actualizarActivo = (id, nuevoActivo) => {
    if (nuevoActivo) dispatch(reactivarVino(id));
    else dispatch(desactivarVino(id));
  };

  return { productos, cargando: statusAdmin === "loading", error, actualizarActivo };
};

export default useVinosAdmin;
