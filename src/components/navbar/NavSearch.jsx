import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const NavSearch = () => {
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      navigate(`/productos?q=${encodeURIComponent(value.trim())}`);
      setAbierto(false);
      setValue("");
    }
    if (e.key === "Escape") {
      setAbierto(false);
      setValue("");
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
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ border: "none", borderBottom: "1px solid var(--border)", background: "transparent", padding: "4px 8px", fontSize: "14px", outline: "none", width: "180px", fontFamily: "var(--font-sans)" }}
        />
      )}
      <LuSearch size={20} style={{ cursor: "pointer", color: "var(--neutral)" }} onClick={() => setAbierto((v) => !v)} />
    </>
  );
};

export default NavSearch;
