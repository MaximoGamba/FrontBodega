import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { setBusqueda, setSearchAbierto, limpiarBusqueda } from "@/redux/catalogoUISlice";

const NavSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const abierto  = useSelector((state) => state.catalogoUI.searchAbierto);
  const value    = useSelector((state) => state.catalogoUI.busqueda);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      navigate(`/productos?q=${encodeURIComponent(value.trim())}`);
      dispatch(limpiarBusqueda());
    }
    if (e.key === "Escape") {
      dispatch(limpiarBusqueda());
    }
  };

  return (
    <>
      {abierto && (
        <input
          autoFocus
          type="text"
          placeholder="Buscar..."
          value={value}
          onChange={(e) => dispatch(setBusqueda(e.target.value))}
          onKeyDown={handleKeyDown}
          style={{ border: "none", borderBottom: "1px solid var(--border)", background: "transparent", padding: "4px 8px", fontSize: "14px", outline: "none", width: "180px", fontFamily: "var(--font-sans)" }}
        />
      )}
      <LuSearch size={20} style={{ cursor: "pointer", color: "var(--neutral)" }} onClick={() => dispatch(setSearchAbierto(!abierto))} />
    </>
  );
};

export default NavSearch;
