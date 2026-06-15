import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogos } from "@/redux/catalogosSlice";

const CATALOGOS_TTL = 5 * 60 * 1000;

const useCatalogos = () => {
  const dispatch      = useDispatch();
  const status        = useSelector((state) => state.catalogos.status);
  const statusAt      = useSelector((state) => state.catalogos.statusAt);
  const error         = useSelector((state) => state.catalogos.error);
  const colores       = useSelector((state) => state.catalogos.colores);
  const cepas         = useSelector((state) => state.catalogos.cepas);
  const azucares      = useSelector((state) => state.catalogos.azucares);
  const crianzas      = useSelector((state) => state.catalogos.crianzas);
  const elaboraciones = useSelector((state) => state.catalogos.elaboraciones);
  const medidas       = useSelector((state) => state.catalogos.medidas);

  useEffect(() => {
    if (status === "idle") { dispatch(getCatalogos()); return; }
    if (status === "succeeded" && statusAt && Date.now() - statusAt > CATALOGOS_TTL) {
      dispatch(getCatalogos());
    }
  }, [dispatch, status, statusAt]);

  // useMemo estabiliza la referencia del objeto para que efectos externos
  // que dependen de `catalogos` no se re-ejecuten en cada render del padre
  const catalogos = useMemo(
    () => status === "succeeded"
      ? { colores, cepas, azucares, crianzas, elaboraciones, medidas }
      : null,
    [status, colores, cepas, azucares, crianzas, elaboraciones, medidas]
  );

  return { catalogos, cargando: status === "loading", error };
};

export default useCatalogos;
